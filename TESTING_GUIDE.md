# Testing Guide - Zeitblast SMS Platform

## 🎯 How to Login and Test the Dashboard

### Step 1: Access the Application
Open your browser and go to: **https://clone-zeitblast.vercel.app/**

### Step 2: Create Your Account

1. Click **"Sign Up"** or navigate to: https://clone-zeitblast.vercel.app/auth/signup

2. Fill in the registration form:
   ```
   Organization Name: Your Company Name
   Your Name: Your Full Name
   Email: your.email@example.com
   Password: YourSecurePassword123
   Confirm Password: YourSecurePassword123
   ```

3. Click **"Sign Up"**

4. You'll be automatically logged in and redirected to the dashboard

**Note:** The first user to sign up automatically gets **ADMIN** privileges!

---

### Step 3: Login (For Existing Users)

1. Go to: https://clone-zeitblast.vercel.app/auth/signin

2. Enter your credentials:
   ```
   Email: your.email@example.com
   Password: YourSecurePassword123
   ```

3. Click **"Sign In"**

---

## 📱 Testing Platform Features

### Test 1: Add a Contact

1. Go to **Dashboard** → **Contacts** → **Add Contact**
2. Fill in contact details:
   ```
   First Name: John
   Last Name: Doe
   Phone: +1234567890 (or your own phone for testing)
   Email: john.doe@example.com
   Property Address: 123 Main St
   City: New York
   State: NY
   ZIP: 10001
   ```
3. Click **"Add Contact"**
4. You should see the contact in your contacts list

### Test 2: Send a Test SMS

**Prerequisites:**
- You need to have Twilio credentials configured (already done: +1 (667) 213-1359)
- Add a contact with a valid phone number

**Steps:**
1. Go to **Campaigns** → **New Campaign**
2. Fill in:
   ```
   Campaign Name: Test Campaign
   Message: Hi {firstName}, this is a test message from Zeitblast!
   ```
3. Select the contact(s) you want to send to
4. Click **"Create Campaign"**
5. Click **"Send Campaign"**
6. Check your phone for the SMS!

### Test 3: View Conversations

1. After sending SMS, go to **Conversations**
2. You'll see your sent messages
3. Reply to the SMS from your phone
4. Refresh the conversations page to see your reply
   - (Note: Webhook needs to be configured for real-time - see below)

### Test 4: View Analytics

1. Go to **Analytics**
2. View:
   - Total Contacts
   - Messages Sent
   - Total Conversations
   - Response Rate
   - Contact/Message status breakdowns

### Test 5: Phone Number Management

1. Go to **Phone Numbers**
2. View your Twilio phone number: **+1 (667) 213-1359**
3. See usage statistics and health score

---

## 🔧 Important Configuration

### Enable Incoming SMS (Webhook)

For **receiving** SMS replies, configure Twilio webhook:

1. Go to [Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/active)
2. Click on your phone number: **+1 (667) 213-1359**
3. Under "Messaging Configuration" → "A MESSAGE COMES IN":
   - **Webhook URL:** `https://clone-zeitblast.vercel.app/api/sms/webhook`
   - **HTTP Method:** `POST`
4. Click **Save**

Now when someone replies to your SMS, it will:
- ✅ Appear in your Conversations inbox
- ✅ Auto-create a contact if they're new
- ✅ Handle opt-outs (STOP, UNSUBSCRIBE)

---

## 🧪 Quick Testing Checklist

- [ ] Sign up successfully
- [ ] Login works
- [ ] Dashboard displays stats
- [ ] Add a contact
- [ ] Create a campaign
- [ ] Send campaign (receive SMS)
- [ ] View sent messages in Conversations
- [ ] Reply to SMS (after webhook configured)
- [ ] See reply in Conversations inbox
- [ ] View analytics data
- [ ] Check phone number stats

---

## 🐛 Troubleshooting

### Issue: "CSS is broken / No styling"
**Solution:** Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: "Can't send SMS"
**Check:**
- Twilio credentials are set in Vercel environment variables
- Phone number is in E.164 format (+1234567890)
- Twilio account has credit

### Issue: "Not receiving replies"
**Check:**
- Twilio webhook is configured correctly
- Webhook URL is HTTPS (required by Twilio)
- Test by sending to the webhook: `curl -X POST https://clone-zeitblast.vercel.app/api/sms/webhook`

### Issue: "Database errors"
**Check:**
- DATABASE_URL is set in Vercel
- Using PostgreSQL (not SQLite) in production
- Run migrations: `npx prisma migrate deploy`

---

## 📊 Test Data Examples

### Sample Contact
```
Name: Jane Smith
Phone: +19876543210
Email: jane@example.com
Address: 456 Oak Ave, Los Angeles, CA 90001
Status: NEW
Tags: ["Lead", "Hot"]
```

### Sample Campaign Message
```
Hi {firstName}! 👋

I noticed you own property at [address].
Are you interested in selling? I'd love to help!

Reply YES for a free valuation.

- Your Name
Real Estate Team
```

### Sample Drip Campaign (Coming Soon)
```
Day 1: Introduction message
Day 3: Follow-up with value proposition
Day 7: Special offer
Day 14: Final call to action
```

---

## 🎓 Feature Guide

### Merge Fields
Use these in your messages:
- `{firstName}` - Contact's first name
- `{lastName}` - Contact's last name
- `{phone}` - Contact's phone number

Example:
```
Hey {firstName}! This is [Your Name] from [Company].
```
Becomes:
```
Hey John! This is [Your Name] from [Company].
```

### Contact Statuses
- **NEW** - Just added
- **CONTACTED** - Message sent
- **RESPONDED** - Replied to message
- **HOT** - High interest
- **UNDER_CONTRACT** - Deal in progress
- **CLOSED** - Deal closed
- **DNC** - Do Not Contact
- **OPTED_OUT** - Requested removal

### Message Statuses
- **PENDING** - Queued for sending
- **SENT** - Successfully sent
- **DELIVERED** - Delivered to phone
- **FAILED** - Send failed
- **RECEIVED** - Inbound message

---

## 🚀 Production Deployment Checklist

Before going live with real customers:

- [ ] Switch DATABASE_URL to PostgreSQL
- [ ] Configure Twilio webhook
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Enable HTTPS only
- [ ] Test SMS delivery
- [ ] Test SMS receiving
- [ ] Verify DNC list works
- [ ] Test opt-out functionality (send "STOP")
- [ ] Load test with 100+ contacts
- [ ] Set up monitoring/logging
- [ ] Configure custom domain
- [ ] Add payment processing (if needed)

---

**Ready to test!** 🎉

Start by creating your account at: https://clone-zeitblast.vercel.app/auth/signup
