**Aerofy** is a secure file sharing backend built in Rust using the [Axum](https://docs.rs/axum/latest/axum/) web framework. It enables robust end-to-end encrypted file transfers, secure user authentication, and safe storage through hybrid cryptography (AES + RSA).

## 🚀 Features

* 🔐 **Secure User Authentication** (JWT + Argon2)
* 🔒 **End-to-End File Encryption** (AES-256 for content, RSA for key exchange)
* 📁 **Password-Protected File Sharing**
* 🧾 **File Management** (upload, retrieve, list)
* ⏳ **Scheduled Auto-Cleanup of Expired Files**
* 🔑 **Per-User RSA Key Management**

---

## 🧱 Architecture Overview

### Core Components

* **Auth System**: JWT-based, password hashing with Argon2
* **Encryption**: AES-256-GCM + RSA (2048-bit)
* **Database**: PostgreSQL (via SQLx)
* **REST API**: Well-structured endpoints
* **Schedulers**: Cleanup of expired files via cron

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config.rs         # App configuration
│   ├── db.rs             # Database integration
│   ├── dtos.rs           # DTOs for API requests/responses
│   ├── error.rs          # Centralized error handling
│   ├── handler/          # API route handlers
│   │   ├── auth.rs       # Auth logic
│   │   ├── file.rs       # File upload/download
│   │   ├── file_query.rs # Listing files
│   │   ├── mod.rs
│   │   └── user.rs       # User profile management
│   ├── main.rs           # Entry point
│   ├── middleware.rs     # Auth middleware
│   ├── models.rs         # DB models
│   ├── router.rs         # Route definitions
│   └── utils/            # Utility modules
│       ├── decrypt.rs
│       ├── encrypt.rs
│       ├── keys.rs
│       ├── mod.rs
│       ├── password.rs
│       └── token.rs
```

---

## 📡 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Authenticate and receive JWT

### 👤 User Management

* `GET /api/users/me` – Get current user info
* `PUT /api/users/name` – Update display name
* `PUT /api/users/password` – Change password
* `GET /api/users/search-emails` – Search by email

### 📁 File Operations

* `POST /api/file/upload` – Encrypt and share a file
* `POST /api/file/retrieve` – Decrypt and download shared file

### 🗂 File Listing

* `GET /api/list/sent` – List sent files
* `GET /api/list/received` – List received files

---

## 🔐 Security Features

### Passwords

* Hashed using **Argon2**
* Maximum length enforced
* Constant-time comparison for verification

### File Encryption

* AES-256-GCM for file contents
* AES key encrypted using RSA (2048-bit)
* Each user has a unique RSA key pair
* Private keys securely stored server-side

### Auth

* JWT with configurable expiry
* Support for cookie or bearer token
* Middleware enforcement for protected routes

---

## ⚙️ Setup & Configuration

### 📄 Environment Variables

```env
DATABASE_URL=postgres://username:password@localhost:5432/aerofy
JWT_SECRET_KEY=your_jwt_secret_key
JWT_MAXAGE=60
```

### 🛢 Database

PostgreSQL with required tables:

* `users`
* `files`
* `shared_links`

### 🧪 Running the Server

```bash
cargo run
```

By default, the server listens on **`http://localhost:8080`**.

---

## ⏰ Scheduled Tasks

Aerofy includes hourly cron jobs to:

* Remove **expired shared files**
* Clean up **stale metadata**

Managed using `tokio-cron-scheduler`.

---

## 🧯 Error Handling

Robust error management with clear HTTP status codes for:

* Auth failures
* Database issues
* Validation errors
* File operation problems

---

## 📦 Dependencies

* [`axum`](https://crates.io/crates/axum) – Web framework
* [`sqlx`](https://crates.io/crates/sqlx) – DB integration
* [`tokio`](https://crates.io/crates/tokio) – Async runtime
* [`rsa`](https://crates.io/crates/rsa) – RSA crypto
* [`argon2`](https://crates.io/crates/argon2) – Password hashing
* [`chrono`](https://crates.io/crates/chrono) – Timestamps
* [`uuid`](https://crates.io/crates/uuid) – UUIDs
* [`serde`](https://crates.io/crates/serde) – Serialization
* [`validator`](https://crates.io/crates/validator) – Input validation
* [`tokio-cron-scheduler`](https://crates.io/crates/tokio-cron-scheduler) – Scheduling

---

## 📬 Contributing

We welcome contributions! Feel free to open issues, submit PRs, or suggest new features.

--
