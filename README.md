# Aerofy 

A secure full-stack file sharing application with a **Rust backend** powered by the [Axum](https://docs.rs/axum/latest/axum/) web framework and a modern **Next.js frontend**. It enables robust **end-to-end encrypted file transfers**, secure user authentication, and safe storage using **hybrid cryptography (AES + RSA).**

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

### 🦀 Backend (Rust)

```bash
backend/
├── src/
│   ├── config.rs         # Environment config loader
│   ├── db.rs             # Database connection and setup
│   ├── dtos.rs           # Request and response structs
│   ├── error.rs          # Custom error handling logic
│   ├── handler/          # API endpoint handlers
│   │   ├── auth.rs       # Auth routes (login, register)
│   │   ├── file.rs       # File upload/download routes
│   │   ├── file_query.rs # File listing and metadata queries
│   │   ├── mod.rs        # Module exports
│   │   └── user.rs       # User profile routes
│   ├── main.rs           # App entry point
│   ├── middleware.rs     # Custom middleware (auth guard, logging)
│   ├── models.rs         # Database models
│   ├── router.rs         # Route definitions and grouping
│   └── utils/            # Utility functions
│       ├── decrypt.rs    # File decryption helpers
│       ├── encrypt.rs    # File encryption helpers
│       ├── keys.rs       # RSA key generation/storage
│       ├── mod.rs        # Utility exports
│       ├── password.rs   # Password hashing and verification
│       └── token.rs      # JWT generation and validation
```

---

### ⚛️ Frontend (Next.js)

```bash
frontend/
├── .env.local             # Frontend-specific env vars (API URL, etc.)
├── next.config.ts         # Next.js configuration (e.g. rewrites)
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript config
├── public/                # Static files served as-is
│   └── Logo.png           # App logo
└── src/
    ├── app/               # App directory (Next.js 13+ routing)
    │   ├── (auth)/        # Layout wrapper for auth pages
    │   │   └── auth/      # Login and register page routes
    │   ├── (pages)/       # Main user-facing routes
    │   │   ├── send/      # Upload/send files
    │   │   ├── receive/   # View/download received files
    │   │   ├── profile/   # User profile and settings
    │   │   └── adrop/     # Comming soon page
    │   ├── globals.css    # Global styles and Tailwind base
    │   ├── layout.tsx     # App-wide layout (navbar, sidebar)
    │   └── page.tsx       # Landing/home page
    ├── components/        # Reusable UI components
    │   ├── ui/            # shadcn/ui components (e.g., buttons, modals)
    │   ├── layouts/       # Layout components for different views
    │   │   └── main-layout.tsx  # Common layout with navigation
    │   ├── sidebar.tsx    # Sidebar navigation UI
    │   └── landingpage.tsx # Landing page hero and features
    ├── hooks/             # Custom React hooks
    │   ├── useAuth.ts     # Auth context & logic
    │   └── useReceive.ts  # Receiving file logic
    ├── store/             # Global state management (Zustand)
    │   ├── authStore.ts   # User session state
    │   ├── sendStore.ts   # File sending state
    │   └── receiveStore.ts # File receiving state
    ├── lib/               # Shared libraries/utilities
    │   └── utils.ts       # Shared helper functions
    ├── types/             # Global TS types/interfaces
    └── utility/           # Utility and style-related helpers
        └── toastStyle.ts  # Custom toast styling
```

---

## 📡 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Authenticate and receive JWT
* `GET /api/auth/logout` – Log out the current user
* `GET /api/auth/verifytoken` – Verify if the JWT is valid

### 👤 User Management

* `GET /api/users/me` – Get user info
* `PUT /api/users/name` – Update display name
* `PUT /api/users/password` – Change password
* `GET /api/users/search-emails` – Search users by email

### 📁 File Operations

* `POST /api/file/upload` – Encrypt & upload a file
* `POST /api/file/retrieve` – Decrypt & download file
* `POST /api/file/accept` – Accept a shared file

### 🗂 File Listing

* `GET /api/list/send` – List sent files
* `GET /api/list/receive` – List received files
* `GET /api/list/pendingreceive` – List files awaiting acceptance

---

## 🔐 Security Features

### Passwords

* Hashed using **Argon2**
* Enforced length & strength rules
* Constant-time comparison for verification

### File Encryption

* **AES-256-GCM**: Symmetric encryption for file contents
* **RSA-2048**: Used to encrypt the AES keys
* Per-user keypairs securely stored

### Authentication

* **JWT-based** with expiry settings
* Supports **Bearer tokens** and **HTTP-only cookies**
* Middleware protected routes (auth guards)

---

## ⚙️ Setup & Configuration

### 📄 Environment Variables

```env
DATABASE_URL=postgres://username:password@localhost:5432/aerofy
JWT_SECRET_KEY=your_jwt_secret_key
JWT_MAXAGE=60
```

### 🛢 Database Schema

Ensure tables exist:

* `users`
* `files`
* `shared_links`

---

## 🧪 Run the App

### Backend:

```bash
cd backend
cargo run
```

Runs at **[http://localhost:8080](http://localhost:8080)**

### Frontend:

```bash
cd frontend
npm install
npm dev
```

Runs at **[http://localhost:3000](http://localhost:3000)**

---

## ⏰ Scheduled Tasks

Uses [`tokio-cron-scheduler`](https://crates.io/crates/tokio-cron-scheduler) for:

* Cleaning expired file shares
* Removing orphaned file records

---

## 🧯 Error Handling

Handled centrally for:

* Auth issues
* Input validation
* I/O and upload errors
* DB failures

---

## 📦 Key Dependencies

* [`axum`](https://crates.io/crates/axum) – Web server
* [`sqlx`](https://crates.io/crates/sqlx) – PostgreSQL support
* [`tokio`](https://crates.io/crates/tokio) – Async runtime
* [`rsa`](https://crates.io/crates/rsa) – RSA crypto
* [`argon2`](https://crates.io/crates/argon2) – Password hashing
* [`chrono`](https://crates.io/crates/chrono) – Timestamps
* [`uuid`](https://crates.io/crates/uuid) – Unique IDs
* [`validator`](https://crates.io/crates/validator) – Input validation
* [`serde`](https://crates.io/crates/serde) – JSON (de)serialization
* [`Next.js`](https://nextjs.org) – Frontend framework
* [`shadcn/ui`](https://ui.shadcn.dev) – Prebuilt styled components

---

## 📬 Contributing

We welcome contributions from the community!
Open issues, submit PRs, or suggest features.
