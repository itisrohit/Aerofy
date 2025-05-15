use std::sync::Arc;

use axum::{extract::{Request}, http::{header, HeaderMap}, response::IntoResponse, routing::{post, get}, Extension, Json, Router};
use axum_extra::extract::cookie::{Cookie, CookieJar};
use validator::Validate;
use serde::Serialize;

use crate::{db::UserExt, dtos::{LoginUserDto, RegisterUserDto, UserLoginResponseDto}, error::{ErrorMessage, HttpError}, utils::{keys::generate_key, password, token}, AppState};

pub fn auth_handler() -> Router {
    Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
        .route("/logout", post(logout))
        .route("/verify", get(verify_token))
}

fn create_auth_cookie(token: &str, maxage_minutes: Option<i64>) -> Cookie<'static> {
    let duration = match maxage_minutes {
        Some(minutes) => time::Duration::minutes(minutes),
        None => time::Duration::seconds(0) // For logout
    };
    
    Cookie::build(("token", token.to_string()))
        .path("/")
        .max_age(duration)
        .secure(true) 
        .same_site(axum_extra::extract::cookie::SameSite::None)
        .http_only(true)
        .build()
}

fn create_auth_response<T: Serialize>(data: T, cookie: Cookie<'static>) -> axum::response::Response {
    let json_response = Json(data);
    
    let mut headers = HeaderMap::new();
    headers.append(header::SET_COOKIE, cookie.to_string().parse().unwrap());

    
    let mut response = json_response.into_response();
    response.headers_mut().extend(headers);
    
    response
}

pub async fn register(
    Extension(app_state): Extension<Arc<AppState>>,
    Json(body): Json<RegisterUserDto>
) -> Result<impl IntoResponse, HttpError> {
    body.validate()
     .map_err(|e| HttpError::bad_request(e.to_string()))?;

    let hash_password = password::hash(&body.password)
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    let result = app_state.db_client
        .save_user(&body.name, &body.email, &hash_password)
        .await;

    match result {
        Ok(user) => {
            let _key_result = generate_key(&app_state, &user).await?;
            
            let token = token::create_token(
                &user.id.to_string(), 
                &app_state.env.jwt_secret.as_bytes(), 
                app_state.env.jwt_maxage
            ).map_err(|e| HttpError::server_error(e.to_string()))?;
            
            let cookie = create_auth_cookie(&token, Some(app_state.env.jwt_maxage * 60));
            
            let response_data = UserLoginResponseDto {
                status: "success".to_string(),
                token: token.clone(),
            };
            
            Ok(create_auth_response(response_data, cookie))
        },
        Err(sqlx::Error::Database(db_err)) => {
            if db_err.is_unique_violation() {
                Err(HttpError::unique_constraint_violation(
                    ErrorMessage::EmailExist.to_string()
                ))
            } else {
                Err(HttpError::server_error(db_err.to_string()))
            }
        }
        Err(e) => Err(HttpError::server_error(e.to_string()))
    }
}

pub async fn login(
    Extension(app_state): Extension<Arc<AppState>>,
    Json(body): Json<LoginUserDto>
) -> Result<impl IntoResponse, HttpError> {
    body.validate()
        .map_err(|e| HttpError::bad_request(e.to_string()))?;

    let result = app_state.db_client
        .get_user(None, None, Some(&body.email))
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    let user = result.ok_or(HttpError::bad_request(ErrorMessage::WrongCredentials.to_string()))?;

    let password_matched = password::compare(&body.password, &user.password)
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    if password_matched {
        let token = token::create_token(
            &user.id.to_string(), 
            &app_state.env.jwt_secret.as_bytes(), 
            app_state.env.jwt_maxage
        )
        .map_err(|e| HttpError::server_error(e.to_string()))?;

        let cookie = create_auth_cookie(&token, Some(app_state.env.jwt_maxage * 60));
        
        let response_data = UserLoginResponseDto {
            status: "success".to_string(),
            token: token.clone(),
        };
        
        Ok(create_auth_response(response_data, cookie))
    } else {
        Err(HttpError::bad_request(ErrorMessage::WrongCredentials.to_string()))
    }
}

pub async fn logout() -> Result<impl IntoResponse, HttpError> {
    let cookie = create_auth_cookie("", None); // Empty token with no duration (immediate expiry)
    
    let response_data = serde_json::json!({
        "status": "success",
        "message": "Logged out successfully"
    });
    
    Ok(create_auth_response(response_data, cookie))
}

pub async fn verify_token(
    cookie_jar: CookieJar,
    Extension(app_state): Extension<Arc<AppState>>,
    request: Request,
) -> Result<impl IntoResponse, HttpError> {
    let token = cookie_jar
        .get("token")
        .map(|cookie| cookie.value().to_string())
        .or_else(|| {
            request.headers()
                .get(header::AUTHORIZATION)
                .and_then(|auth_header| auth_header.to_str().ok())
                .and_then(|auth_value| {
                    if auth_value.starts_with("Bearer ") {
                        Some(auth_value[7..].to_owned())
                    } else {
                        None
                    }
                })  
        })
        .ok_or_else(|| {
            HttpError::unauthorized(ErrorMessage::TokenNotProvided.to_string())
        })?;

    let _token_details = token::decode_token(&token, app_state.env.jwt_secret.as_bytes())?;
    let response_data = serde_json::json!({
        "status": "success",
        "verified": true,
        "message": "Token is valid"
    });
    
    Ok(Json(response_data))
}