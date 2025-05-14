use std::sync::Arc;

use axum::{http::StatusCode, response::IntoResponse};
use rand::rngs::OsRng;
use rsa::{pkcs1::{EncodeRsaPrivateKey, EncodeRsaPublicKey}, RsaPrivateKey, RsaPublicKey};

use crate::{db::UserExt, error::HttpError, models::User, AppState};

pub async fn generate_key(
    app_state: &Arc<AppState>,
    user: &User,
) -> Result<impl IntoResponse, HttpError> {

    let mut rng = OsRng;

    let private_key = RsaPrivateKey::new(&mut rng, 2048)
    .map_err(|e| {
        HttpError::server_error(e.to_string())
    })?;

    let public_key = RsaPublicKey::from(&private_key);

    let private_key_pem = private_key.to_pkcs1_pem(rsa::pkcs1::LineEnding::LF)
    .map_err(|e| HttpError::server_error(e.to_string()))?;

    let public_key_pem = public_key.to_pkcs1_pem(rsa::pkcs1::LineEnding::LF)
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    // Save both keys in the database
    app_state.db_client
        .save_user_keys(
            user.id,
            public_key_pem.clone(),
            private_key_pem.to_string(),
        )
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    // Remove filesystem code - we're not storing keys on disk anymore
    
    Ok((StatusCode::OK, "true"))
}