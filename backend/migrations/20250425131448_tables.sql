-- Migration script for creating Aerofy database tables

-- Enable UUID generation functionality
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table - Stores user account information
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier for each user
    name VARCHAR(100) NOT NULL,                      -- User's full name (required)
    email VARCHAR(255) UNIQUE NOT NULL,              -- User's email (required, must be unique)
    password VARCHAR(255) NOT NULL,                  -- Hashed password for authentication 
    public_key TEXT,                                 -- User's public key for encryption (optional)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- When the account was created
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- When the account was last updated
);

ALTER TABLE users ADD COLUMN private_key TEXT;

-- Files table - Stores encrypted files uploaded by users
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier for each file
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Owner of the file (deletes file if user is deleted)
    file_name VARCHAR(255) NOT NULL,                 -- Original name of the uploaded file
    file_size BIGINT NOT NULL,                       -- Size of the file in bytes
    encrypted_aes_key BYTEA NOT NULL,                -- AES encryption key (itself encrypted with user's public key)
    encrypted_file BYTEA NOT NULL,                   -- The actual file content (encrypted)
    iv BYTEA NOT NULL,                               -- Initialization Vector used for AES encryption
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- When the file was uploaded
);

-- Shared links table - Manages file sharing between users
CREATE TABLE shared_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier for each shared link
    file_id UUID REFERENCES files(id) ON DELETE CASCADE, -- File being shared (link removed if file is deleted)
    recipient_user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- User receiving access (link removed if user is deleted)
    password VARCHAR(255) NOT NULL,                  -- Password protection for accessing the shared file
    expiration_date TIMESTAMP WITH TIME ZONE NOT NULL, -- When the shared link will expire
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- When the file was shared
);