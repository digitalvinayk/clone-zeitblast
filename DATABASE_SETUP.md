# Database Setup Guide - Vercel Postgres

## Why You Need This

**SQLite DOES NOT work on Vercel!** Your signup/login isn't working because:
- ❌ Vercel serverless functions have ephemeral file systems
- ❌ SQLite database files get deleted after each function execution
- ❌ Data is not persisted between requests
- ✅ **Solution: Use Vercel Postgres (PostgreSQL)**

---

## Step 1: Create Vercel Postgres Database

### Option A: Through Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your **clone-zeitblast** project
3. Click **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a database name: `intelloblast-db`
7. Select region closest to your users (e.g., `us-east-1`)
8. Click **Create**

### Option B: Through Vercel CLI

```bash
vercel postgres create intelloblast-db
```

---

## Step 2: Connect Database to Project

After creating the database:

1. Vercel will ask "**Connect to project?**"
2. Select **clone-zeitblast**
3. Vercel automatically adds these environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` ← **Use this one**
   - `POSTGRES_URL_NON_POOLING`

4. Go to **Settings** → **Environment Variables**
5. Find `POSTGRES_PRISMA_URL`
6. **RENAME** the variable `DATABASE_URL` (or add new one):
   ```
   DATABASE_URL=${POSTGRES_PRISMA_URL}
   ```

**Important:** Make sure `DATABASE_URL` points to `POSTGRES_PRISMA_URL` for Prisma compatibility.

---

## Step 3: Update Local Environment

Update your local `.env` file:

```bash
# Replace SQLite with PostgreSQL
# Get this from Vercel Dashboard → Storage → Your Database → .env.local
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

Or copy from Vercel:
```bash
vercel env pull .env.local
```

---

## Step 4: Create Database Schema

Run Prisma migrations to create all tables:

```bash
# Install dependencies first
npm install

# Create the database schema
npx prisma migrate deploy

# OR create a new migration (if developing)
npx prisma migrate dev --name init
```

This creates all the tables:
- Users
- Organizations
- Contacts
- Campaigns
- Messages
- Conversations
- And more...

---

## Step 5: Seed Database with Test Users

Create test users to login immediately:

```bash
npm run db:seed
```

This creates:

**Admin User:**
- Email: `admin@intelloblast.com`
- Password: `password123`
- Role: ADMIN

**Regular User:**
- Email: `user@intelloblast.com`
- Password: `password123`
- Role: USER

---

## Step 6: Deploy to Vercel

Push your changes (schema is already updated to PostgreSQL):

```bash
git add -A
git commit -m "feat: Migrate to PostgreSQL for Vercel compatibility"
git push origin your-branch-name
```

---

## Step 7: Run Migrations on Vercel

After deployment, run migrations on production database:

### Option A: Vercel Dashboard

1. Go to **Deployments** → Latest Deployment
2. Click **Functions** tab
3. Find any function (e.g., `api/auth/[...nextauth]`)
4. Click **View Function**
5. No direct way - **Use Option B instead**

### Option B: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Run migrations in production
vercel env pull .env.production
npx prisma migrate deploy
```

### Option C: Add to Build Command

Vercel runs migrations automatically on each deploy if you update `package.json`:

```json
{
  "scripts": {
    "build": "prisma migrate deploy && prisma generate && next build"
  }
}
```

**Warning:** This runs migrations on every build, which might cause issues. Better to use Option B.

---

## Step 8: Seed Production Database

SSH into Vercel or use Prisma Studio:

```bash
# Pull production env
vercel env pull .env.production

# Run seed with production DATABASE_URL
npm run db:seed
```

---

## Step 9: Test Login

1. Visit https://clone-zeitblast.vercel.app
2. Click **Login**
3. Use test credentials:
   - Email: `admin@intelloblast.com`
   - Password: `password123`
4. Should redirect to `/dashboard` ✅

---

## Verification Checklist

✅ Vercel Postgres database created
✅ `DATABASE_URL` environment variable set in Vercel
✅ Prisma schema updated to use PostgreSQL
✅ Migrations run successfully
✅ Test users created via seed script
✅ Can login and see dashboard
✅ Data persists between requests

---

## Troubleshooting

### Error: "P1001: Can't reach database server"

**Cause:** Wrong `DATABASE_URL` or database not accessible.

**Fix:**
1. Check `DATABASE_URL` in Vercel env vars
2. Make sure it uses `POSTGRES_PRISMA_URL` (has connection pooling)
3. Verify database is in same region as your Vercel project

### Error: "Table does not exist"

**Cause:** Migrations not run.

**Fix:**
```bash
npx prisma migrate deploy
```

### Error: "Invalid username/password"

**Cause:** Seed script not run or wrong credentials.

**Fix:**
1. Run `npm run db:seed`
2. Check you're using correct email/password
3. Verify user exists in database using Prisma Studio:
   ```bash
   npx prisma studio
   ```

### Login Still Not Working

**Check:**
1. ✅ `NEXTAUTH_URL` set to `https://clone-zeitblast.vercel.app`
2. ✅ `NEXTAUTH_SECRET` is set (any random string)
3. ✅ `DATABASE_URL` points to Postgres (not SQLite)
4. ✅ Migrations ran successfully
5. ✅ Test user exists in database
6. ✅ Redeployed after setting env vars

---

## Managing Database

### View Data (Prisma Studio)

```bash
npx prisma studio
```

Opens visual database browser at `http://localhost:5555`

### Create New User Manually

```bash
npx prisma studio
# Or use Vercel Postgres dashboard
```

### Backup Database

Vercel Postgres has automatic backups. To manually export:

```bash
# Using Vercel CLI
vercel postgres dump intelloblast-db > backup.sql
```

### Reset Database (CAUTION: Deletes all data)

```bash
npx prisma migrate reset
npm run db:seed
```

---

## Database Schema Overview

Your database has these main tables:

- **User** - User accounts (admin, agents, etc.)
- **Organization** - Multi-tenant organizations
- **Contact** - Lead contacts
- **Campaign** - SMS campaigns
- **Message** - Individual SMS messages
- **Conversation** - SMS conversations
- **PhoneNumber** - Twilio phone numbers
- **Property** - Real estate properties

All relationships are properly configured with cascading deletes.

---

## Next Steps

After database is working:

1. ✅ Test signup/login flow
2. ✅ Create your first campaign
3. ✅ Add contacts
4. ✅ Send test SMS messages
5. ✅ Configure Twilio webhooks for inbound messages

---

## Summary Commands

```bash
# Quick setup (after Vercel Postgres created)
npm install
npx prisma migrate deploy
npm run db:seed

# Test login
# Email: admin@intelloblast.com
# Password: password123
```

That's it! Your database is now properly configured for Vercel. 🎉
