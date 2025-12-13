# Vercel Deployment Setup Guide for Intello Blast

## Current Issue
You're seeing "Configuration Error" after login because NextAuth environment variables are not set in Vercel.

## Required Environment Variables

Go to your Vercel Dashboard → **clone-zeitblast** project → **Settings** → **Environment Variables**

Add these environment variables for **Production**, **Preview**, and **Development**:

### 1. NEXTAUTH_URL
```
NEXTAUTH_URL=https://clone-zeitblast.vercel.app
```
**Important:** Use your actual Vercel deployment URL

### 2. NEXTAUTH_SECRET
```
NEXTAUTH_SECRET=4MSHROS0tnLEnEzGrtz8+bvYIMfnwPUlNm18nsG2BH8=
```
**Note:** This is a newly generated secure random string. You can use this one or generate your own with:
```bash
openssl rand -base64 32
```

### 3. DATABASE_URL
```
DATABASE_URL=file:./dev.db
```
**For Production:** You'll want to use a proper database like:
- PostgreSQL (Vercel Postgres)
- MySQL (PlanetScale)
- MongoDB

For now, SQLite will work but is not ideal for production.

### 4. Twilio Credentials (Use your actual values)
```
TWILIO_ACCOUNT_SID=your-twilio-account-sid-from-console
TWILIO_AUTH_TOKEN=your-twilio-auth-token-from-console
TWILIO_PHONE_NUMBER=+1234567890
```
**Get these from:** https://console.twilio.com

## Step-by-Step Instructions

### Step 1: Add Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select your **clone-zeitblast** project
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar
5. Add each variable one by one:
   - Click **Add New**
   - Enter **Key** (e.g., `NEXTAUTH_URL`)
   - Enter **Value** (e.g., `https://clone-zeitblast.vercel.app`)
   - Select environments: **Production**, **Preview**, **Development**
   - Click **Save**

### Step 2: Redeploy

After adding all environment variables:

**Option A - Trigger Redeploy:**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the three dots (•••) menu
4. Click **Redeploy**
5. Check "Use existing Build Cache" (optional)
6. Click **Redeploy**

**Option B - Push a Small Change:**
```bash
# The latest push will automatically trigger deployment
# Just wait for it to complete
```

### Step 3: Verify Deployment

1. Wait for deployment to complete (usually 1-2 minutes)
2. Visit https://clone-zeitblast.vercel.app
3. Click **Login** or **Get Started**
4. Try signing in with test credentials
5. Should redirect to `/dashboard` successfully

## Expected Flow After Fix

1. User visits https://clone-zeitblast.vercel.app
2. Clicks "Login" → goes to `/auth/signin`
3. Enters email and password
4. Submits form
5. ✅ Successfully redirects to `/dashboard`
6. User can now access all dashboard features

## Testing Login

Since this is a new deployment, you'll need to create a test user first:

### Option 1: Use Signup Flow
1. Go to https://clone-zeitblast.vercel.app/auth/signup
2. Create a new account
3. Sign in with those credentials

### Option 2: Create User Directly in Database
You'll need to access your database and create a user with a hashed password.

## Troubleshooting

### Still Getting Configuration Error?

1. **Check Environment Variables Are Set:**
   - Verify all 4 required variables are in Vercel
   - Make sure they're set for "Production" environment
   - Redeploy after adding them

2. **Check NEXTAUTH_URL Matches Deployment:**
   - Should be exact: `https://clone-zeitblast.vercel.app`
   - No trailing slash
   - Must use HTTPS

3. **Verify Database Connection:**
   - Check DATABASE_URL is correct
   - For SQLite, ensure Prisma can access it
   - Consider upgrading to PostgreSQL for production

4. **Check Build Logs:**
   - Go to Deployments → Latest Deployment → Build Logs
   - Look for any errors related to Prisma or NextAuth

### Getting Different Error?

- **"Invalid credentials"** → User doesn't exist or wrong password
- **"Missing email or password"** → Form validation issue
- **500 Error** → Check function logs in Vercel

## Next Steps After Login Works

Once login is working, you can:

1. **Set Up Database:**
   - Consider migrating from SQLite to PostgreSQL
   - Use Vercel Postgres for easy integration

2. **Create Test Users:**
   - Sign up through the UI
   - Or use Prisma Studio to manage users

3. **Test SMS Features:**
   - Configure Twilio webhooks
   - Send test campaigns
   - Verify message delivery

4. **Monitor Performance:**
   - Check Vercel Analytics
   - Monitor function logs
   - Track errors in real-time

## Important Security Notes

- **NEVER** commit `.env` files to Git
- **NEVER** share your NEXTAUTH_SECRET publicly
- **ROTATE** your Twilio credentials if exposed
- **USE** a proper production database (not SQLite)

## Need Help?

If you're still having issues after following this guide:

1. Check Vercel function logs for detailed error messages
2. Verify all environment variables are set correctly
3. Make sure you've redeployed after adding variables
4. Contact support with specific error messages

---

**Summary:** Add the 4 environment variables in Vercel, redeploy, and login should work!
