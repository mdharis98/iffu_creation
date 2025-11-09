# QuickMart - Full-Stack E-Commerce Application

A complete MERN stack e-commerce web application with admin panel, product management, order processing, and WhatsApp notifications.

## Features

### General Features
- **Homepage**: Display all products in a modern card layout
- **Product Cards**: Show image, name, price, description, like button, and order button
- **Product Details**: Modal with image carousel, video support, full description, likes, and feedback
- **User Interactions**: Like products, place orders, submit feedback (no login required)

### Admin Section
- **Admin Login**: Secure authentication (no signup for regular users)
- **Product Management**: Add, edit, and delete products
- **Media Upload**: Upload multiple images and videos using Cloudinary
- **Order Management**: View all customer orders
- **Feedback Management**: View all customer feedbacks

### Order Processing
- **Order Form**: Collect customer name, phone, address, and location
- **WhatsApp Notifications**: Automatically notify admin via WhatsApp when orders are placed
- **Order Storage**: All orders saved to MongoDB

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Media Storage**: Cloudinary
- **Notifications**: Twilio WhatsApp API
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Twilio account (for WhatsApp notifications)

### Setup Steps

1. **Clone and Install Dependencies**
   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000

   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/quickmart

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Admin Credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Twilio Configuration (for WhatsApp)
   TWILIO_ACCOUNT_SID=your-account-sid
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

   # Admin WhatsApp Number (to receive notifications)
   ADMIN_PHONE_NUMBER=whatsapp:+1234567890
   ```

3. **Start MongoDB**
   
   Make sure MongoDB is running on your system or use MongoDB Atlas connection string.

4. **Run the Application**
   
   ```bash
   # Development mode (runs both server and client)
   npm run dev

   # Or run separately:
   # Server only
   npm run server

   # Client only (in another terminal)
   npm run client
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Login: http://localhost:3000/admin/login

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/like` - Like a product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (Admin only)

### Feedback
- `GET /api/feedback/product/:productId` - Get feedbacks for a product
- `POST /api/feedback` - Create feedback
- `GET /api/feedback/all` - Get all feedbacks (Admin only)

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**⚠️ Change these credentials in production!**

## Project Structure

```
quickmart/
├── server/
│   ├── config/
│   │   └── cloudinary.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── feedback.js
│   ├── utils/
│   │   └── whatsapp.js
│   └── index.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── package.json
└── README.md
```

## Features in Detail

### Product Management
- Upload multiple product images
- Upload optional product video
- Edit existing products
- Delete products
- View all products on homepage

### Order Processing
- Customer fills order form with details
- Order saved to database
- Automatic WhatsApp notification to admin
- Admin can view all orders in dashboard

### Feedback System
- Users can submit feedback for products
- Feedback displayed on product detail modal
- Admin can view all feedbacks

### Responsive Design
- Mobile-friendly layout
- Modern UI with Tailwind CSS
- Smooth animations and transitions
- Hover effects on interactive elements

## Notes

- Only admins can login and manage products
- Regular users don't need to sign up or login
- Admin credentials are stored in environment variables
- WhatsApp notifications require Twilio account setup
- Cloudinary is used for media storage and CDN

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running or check your connection string
2. **Cloudinary Upload Fails**: Verify your Cloudinary credentials in `.env`
3. **WhatsApp Notifications Not Working**: Check Twilio credentials and phone number format
4. **CORS Errors**: Ensure backend is configured to allow frontend origin

## License

MIT License - feel free to use this project for learning and development.

