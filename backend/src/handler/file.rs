use std::sync::Arc;

use axum::{body::Body, extract::Multipart, http::{Response, StatusCode}, response::IntoResponse, routing::post, Extension, Json, Router};
use chrono::{DateTime, Utc};
use rsa::{pkcs1::{DecodeRsaPrivateKey, DecodeRsaPublicKey}, RsaPrivateKey, RsaPublicKey};
use validator::Validate;

use crate::{db::UserExt, dtos::{FileUploadDtos, Response as ResponseDto, DownloadFileDto, RetrieveFileDto}, error::HttpError, middleware::JWTAuthMiddeware, utils::{decrypt::decrypt_file, encrypt::encrypt_file, password}, AppState};

pub fn file_handle() -> Router {
    Router::new()
    .route("/upload", post(upload_file))
    .route("/retrieve", post(retrieve_file))
    .route("/accept", post(accept_file))
}

pub async fn upload_file(
    Extension(app_state): Extension<Arc<AppState>>,
    Extension(user): Extension<JWTAuthMiddeware>,
    mut multipart: Multipart
) -> Result<impl IntoResponse, HttpError> {

    let mut file_data = Vec::new();
    let mut file_name = String::new();
    let mut file_size: i64 = 0;
    let mut form_data = FileUploadDtos {
        recipient_email: String::new(),
        password: String::new(),
        expiration_date: String::new(),
    };

    while let Some(field) = multipart.next_field().await.unwrap() {
        let name = field.name().unwrap().to_string();

        match name.as_str() {
            "fileUpload" => {
                file_name = field.file_name().unwrap_or("unknow_file").to_string();
                file_data = field.bytes().await.unwrap().to_vec();
                file_size = file_data.len() as i64;
            },
            "recipient_email" => {
                form_data.recipient_email = field.text().await.unwrap();
            },
            "password" => {
                form_data.password = field.text().await.unwrap();
            },
            "expiration_date" => {
                form_data.expiration_date = field.text().await.unwrap();
            },
            _ => {}
        }
    }

    form_data.validate()
        .map_err(|e| HttpError::bad_request(e.to_string()))?;

    let recipient_result = app_state.db_client
        .get_user(None, None, Some(&form_data.recipient_email))
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    let recipient = match recipient_result {
        Some(user) => user,
        None => {
            return Err(HttpError::not_found("Recipient not found".to_string()));
        }
    };

    let public_key_str = match &recipient.public_key {
        Some(key) => key,
        None => {
            return Err(HttpError::bad_request("Recipient has no public key".to_string()));
        }
    };

    let public_key = match RsaPublicKey::from_pkcs1_pem(public_key_str) {
        Ok(key) => key,
        Err(e) => {
            tracing::error!("Failed to parse PKCS1 PEM key: {}", e);
            return Err(HttpError::server_error(format!("Key parsing error: {}", e)));
        }
    };

    let (
        encrypted_aes_key,
        encrypted_data,
        iv
    ) = encrypt_file(file_data, &public_key).await?;

    let user_id = uuid::Uuid::parse_str(&user.user.id.to_string()).unwrap();

    let hash_password = password::hash(&form_data.password)
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    let expiration_date = DateTime::parse_from_rfc3339(&form_data.expiration_date)
        .map_err(|e| HttpError::server_error(e.to_string()))?
        .with_timezone(&Utc);

    let recipient_user_id = uuid::Uuid::parse_str(&recipient.id.to_string()).unwrap();

    app_state.db_client
        .save_encrypted_file(
            user_id.clone(),
            file_name, 
            file_size, 
            recipient_user_id, 
            hash_password, 
            expiration_date, 
            encrypted_aes_key, 
            encrypted_data, 
            iv
        )
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    let response = ResponseDto {
        message: "File uploaded and encrypted successfully".to_string(),
        status: "success"
    };

    Ok(Json(response))
}

pub async fn retrieve_file(
    Extension(app_state): Extension<Arc<AppState>>,
    Extension(user): Extension<JWTAuthMiddeware>,
    Json(body): Json<DownloadFileDto>
) -> Result<impl IntoResponse, HttpError> {
    // Parse the shared_id from string to UUID
    let shared_id = uuid::Uuid::parse_str(&body.shared_id)
        .map_err(|e| HttpError::bad_request(format!("Invalid shared ID: {}", e)))?;
    
    // Get the user's UUID
    let user_id = user.user.id;
    
    // Get the shared link from the database
    let shared_link = app_state.db_client
        .get_shared(shared_id, user_id)
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?
        .ok_or_else(|| HttpError::bad_request("Shared link not found or has expired".to_string()))?;
    
    // Check if the file has been accepted/retrieved
    if !shared_link.is_retrieved.unwrap_or(false) {
        return Err(HttpError::bad_request("You must accept this file before downloading it".to_string()));
    }
    
    // Get the file ID from the shared link - no password check needed since file is already accepted
    let file_id = shared_link.file_id
        .ok_or_else(|| HttpError::server_error("File ID not found in shared link".to_string()))?;
    
    // Get the file from the database
    let file_result = app_state.db_client
        .get_file(file_id)
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    let file_data = file_result.ok_or_else(|| {
        HttpError::bad_request("The requested file either does not exist or has expired.".to_string())
    })?;

    // Get the user with their private key from the database
    let user_data = app_state.db_client
        .get_user_by_id(user.user.id)
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?
        .ok_or_else(|| HttpError::unauthorized("User not found".to_string()))?;
    
    // Get private key from user data
    let private_key = user_data.private_key
        .ok_or_else(|| HttpError::server_error("Private key not found for user".to_string()))?;
    
    // Parse the PEM string into a RsaPrivateKey object
    let private_key_pem = RsaPrivateKey::from_pkcs1_pem(&private_key)
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    let decrypted_file = decrypt_file(
        file_data.encrypted_aes_key, 
        file_data.encrypted_file,
        file_data.iv,
        &private_key_pem
    ).await?;

    // Create the download response
    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/octet-stream")
        .header("Content-Disposition", format!("attachment; filename=\"{}\"", file_data.file_name))
        .body(Body::from(decrypted_file))
        .map_err(|e| HttpError::server_error(e.to_string()))?;
    
    Ok(response)
}


pub async fn accept_file(
    Extension(app_state): Extension<Arc<AppState>>,
    Extension(user): Extension<JWTAuthMiddeware>,
    Json(body): Json<RetrieveFileDto>
) -> Result<impl IntoResponse, HttpError> {
    // Validate the request body
    body.validate().map_err(|e| HttpError::bad_request(e.to_string()))?;
    
    // Parse the shared_id from string to UUID
    let shared_id = uuid::Uuid::parse_str(&body.shared_id)
        .map_err(|e| HttpError::bad_request(format!("Invalid shared ID: {}", e)))?;
    
    // Get the user's UUID
    let user_id = user.user.id;
    
    // Get the shared link from the database
    let shared_link = app_state.db_client
        .get_shared(shared_id, user_id)
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?
        .ok_or_else(|| HttpError::bad_request("Shared link not found or has expired".to_string()))?;
    
    if shared_link.is_retrieved.unwrap_or(false) {
        return Err(HttpError::bad_request("This file has already been accepted".to_string()));
    }
    
    // Verify the password
    let is_valid = password::compare(&body.password, &shared_link.password)
        .map_err(|e| HttpError::server_error(e.to_string()))?;
    
    if !is_valid {
        return Err(HttpError::unauthorized("Invalid password".to_string()));
    }
    
    // Mark the file as retrieved without downloading
    app_state.db_client
        .mark_file_as_retrieved(shared_id)
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?;
    
    // Create a success response
    let response = ResponseDto {
        message: "File accepted successfully".to_string(),
        status: "success" 
    };
    
    Ok(Json(response))
}