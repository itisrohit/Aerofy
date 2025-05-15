**Aerofy** is a secure full-stack file sharing application with a Rust backend powered by the [Axum](https://docs.rs/axum/latest/axum/) web framework and a modern Next.js frontend. It enables robust end-to-end encrypted file transfers, secure user authentication, and safe storage using hybrid cryptography (AES + RSA).

---

## 🚀 Features

* 🔐 **Secure User Authentication** (JWT + Argon2)
* 🔒 **End-to-End File Encryption** (AES-256 for content, RSA for key exchange)
* 📁 **Password-Protected File Sharing**
* 🧾 **File Management** (upload, retrieve, list)
* ⏳ **Scheduled Auto-Cleanup of Expired Files**
* 🔑 **Per-User RSA Key Management**
* 🖥️ **Modern React Frontend** (Next.js with Tailwind CSS)

---

## 🧱 Architecture Overview

### Core Components

* **Auth System**: JWT-based, password hashing with Argon2
* **Encryption**: AES-256-GCM + RSA (2048-bit)
* **Database**: PostgreSQL (via SQLx)
* **REST API**: Well-structured Axum endpoints
* **Schedulers**: Expired file cleanup using cron jobs
* **UI**: Responsive interface built with Next.js and `shadcn/ui`

---

## 📁 Project Structure

### Backend

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

### Frontend

```
frontend/
├── public/               # Static assets
├── src/
│   ├── app/              # App Router (Next.js 13+)
│   │   ├── (auth)/       # Authentication views
│   │   ├── (pages)/      # Main application pages
│   │   │   ├── send/     # File sending functionality
│   │   │   ├── receive/  # File receiving functionality
│   │   │   └── adrop/    # Additional file sharing tools
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Base UI (buttons, inputs)
│   │   └── layouts/      # Page layout components
│   ├── lib/              # API and auth utilities
│   └── utility/          # Misc helpers (formatting, etc.)
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
* `GET /api/users/search-emails` – Search users by email

### 📁 File Operations

* `POST /api/file/upload` – Encrypt and upload a file
* `POST /api/file/retrieve` – Decrypt and download file

### 🗂 File Listing

* `GET /api/list/sent` – List sent files
* `GET /api/list/received` – List received files

---

## 🔐 Security Features

### Passwords

* Hashed using **Argon2**
* Length-limited and validated
* Constant-time comparison for verification

### File Encryption

* **AES-256-GCM** for file contents
* **RSA (2048-bit)** for encrypting AES key
* Per-user key pairs stored securely

### Authentication

* JWT-based auth with configurable expiry
* Cookie and bearer token support
* Middleware protection on secure routes

---

## ⚙️ Setup & Configuration

### 📄 Environment Variables

```env
DATABASE_URL=postgres://username:password@localhost:5432/aerofy
JWT_SECRET_KEY=your_jwt_secret_key
JWT_MAXAGE=60
```

### 🛢 Database Schema

Ensure the following tables exist:

* `users`
* `files`
* `shared_links`

### 🧪 Run the Server

```bash
cd backend
cargo run
```

Server runs at: **[http://localhost:8080](http://localhost:8080)**

To run the frontend:

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

---

## ⏰ Scheduled Tasks

Aerofy uses cron jobs (via `tokio-cron-scheduler`) to:

* Delete expired shared files
* Clean up orphaned metadata regularly

---

## 🧯 Error Handling

Aerofy includes robust, centralized error handling for:

* Auth failures
* Validation errors
* File I/O problems
* Database connectivity issues

---

## 📦 Key Dependencies

* [`axum`](https://crates.io/crates/axum) – Web framework
* [`sqlx`](https://crates.io/crates/sqlx) – PostgreSQL integration
* [`tokio`](https://crates.io/crates/tokio) – Async runtime
* [`rsa`](https://crates.io/crates/rsa) – RSA encryption
* [`argon2`](https://crates.io/crates/argon2) – Password hashing
* [`chrono`](https://crates.io/crates/chrono) – Time handling
* [`uuid`](https://crates.io/crates/uuid) – UUID generation
* [`serde`](https://crates.io/crates/serde) – Serialization
* [`validator`](https://crates.io/crates/validator) – Input validation
* [`tokio-cron-scheduler`](https://crates.io/crates/tokio-cron-scheduler) – Cron jobs
* [`Next.js`](https://nextjs.org/) – Frontend framework
* [`shadcn/ui`](https://ui.shadcn.dev) – Styled components for UI

---

## 📬 Contributing

We welcome contributions from the community!
Feel free to open issues, submit pull requests, or suggest new features.