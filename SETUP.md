# QuickMart Setup Guide

## Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickmart
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_PHONE_NUMBER=whatsapp:+1234567890
```

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. Set up MongoDB (choose one):
   - Local MongoDB: Install and start MongoDB locally
   - MongoDB Atlas: Get connection string and update MONGODB_URI

3. Set up Cloudinary:
   - Sign up at https://cloudinary.com
   - Get your Cloud Name, API Key, and API Secret
   - Add to .env file

4. Set up Twilio (for WhatsApp):
   - Sign up at https://www.twilio.com
   - Get Account SID and Auth Token
   - Enable WhatsApp sandbox or get production number
   - Format phone number as: whatsapp:+1234567890

5. Run the application:
   ```bash
   npm run dev
   ```

The app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

