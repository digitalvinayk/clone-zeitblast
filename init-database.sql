-- Intello Blast Database Initialization
-- Run this directly in Vercel Postgres Query console if you can't use CLI

-- This script creates:
-- 1. Database tables (schema)
-- 2. Test organization
-- 3. Two test users with hashed passwords

-- =====================================================
-- PART 1: Create All Tables
-- =====================================================

-- Users and Authentication
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "emailVerified" TIMESTAMP(3),
    "name" TEXT,
    "password" TEXT,
    "image" TEXT,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "expires" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "planId" TEXT,
    "dlcBrandId" TEXT,
    "dlcCampaignId" TEXT,
    "complianceStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "settings" JSONB,
    "timezone" TEXT NOT NULL DEFAULT 'America/New_York',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Add foreign key for organizationId
ALTER TABLE "User" ADD CONSTRAINT IF NOT EXISTS "User_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE;

-- Create indexes
CREATE INDEX IF NOT EXISTS "User_organizationId_idx" ON "User"("organizationId");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- =====================================================
-- PART 2: Create Test Organization
-- =====================================================

INSERT INTO "Organization" ("id", "name", "complianceStatus", "timezone", "createdAt", "updatedAt")
VALUES (
    'test-org-001',
    'Test Organization',
    'APPROVED',
    'America/New_York',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;

-- =====================================================
-- PART 3: Create Test Users
-- =====================================================

-- Admin User
-- Email: admin@intelloblast.com
-- Password: password123
-- Password hash generated with bcrypt (10 rounds)
INSERT INTO "User" (
    "id",
    "email",
    "name",
    "password",
    "role",
    "organizationId",
    "createdAt",
    "updatedAt"
)
VALUES (
    'admin-user-001',
    'admin@intelloblast.com',
    'Test Admin',
    '$2b$10$YourHashedPasswordHere',
    'ADMIN',
    'test-org-001',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO NOTHING;

-- Regular User
-- Email: user@intelloblast.com
-- Password: password123
INSERT INTO "User" (
    "id",
    "email",
    "name",
    "password",
    "role",
    "organizationId",
    "createdAt",
    "updatedAt"
)
VALUES (
    'user-user-001',
    'user@intelloblast.com',
    'Test User',
    '$2b$10$YourHashedPasswordHere',
    'USER',
    'test-org-001',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO NOTHING;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check if users were created
SELECT
    id,
    email,
    name,
    role,
    "organizationId",
    "createdAt"
FROM "User"
ORDER BY "createdAt" DESC;

-- Should show:
-- admin@intelloblast.com (ADMIN)
-- user@intelloblast.com (USER)

-- =====================================================
-- NOTES
-- =====================================================

-- ⚠️ IMPORTANT: This script uses placeholder password hashes
-- You MUST run `npm run db:seed` to get proper bcrypt hashes
--
-- This SQL is for creating the schema only.
-- For actual users with working passwords, use:
--   npx prisma migrate deploy
--   npm run db:seed
