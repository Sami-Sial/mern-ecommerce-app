# 🛒 MERN eCommerce App

A full-stack eCommerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform allows users to browse products, filter by categories, add items to their cart, and securely complete purchases. It also features a comprehensive Admin Dashboard for managing products, users, and orders.

**Live Demo:** [See Project](https://shopverse-hub.vercel.app/)

## 🚀 Features

### User Features
- **Authentication**: Secure user login and registration using JWT.
- **Product Catalog**: Browse products with detailed views.
- **Search & Filter**: Search for products and filter by category, pricing, and ratings.
- **Shopping Cart**: Add, update, or remove items from the cart.
- **Checkout & Payments**: Secure checkout process with Stripe integration.
- **Order Management**: View order history and track order status.
- **User Profile**: Update profile details and passwords.

### Admin Features
- **Dashboard**: Overview of total sales, orders, and users with interactive charts.
- **Product Management**: Create, read, update, and delete products. Upload product images via Cloudinary.
- **Order Management**: View and update order statuses (e.g., Processing, Shipped, Delivered).
- **User Management**: View user details, change roles (Admin/User), and delete users.

## 🏗️ Tech Stack

### Frontend (`ecommerce-frontend`)
- **Framework**: React.js (built with Vite)
- **State Management**: Redux Toolkit & React-Redux
- **UI Components**: Material-UI (MUI), React Bootstrap, React Icons
- **Routing**: React Router DOM
- **Payment Processing**: Stripe React (`@stripe/react-stripe-js`)
- **Charts**: Chart.js & React-Chartjs-2

### Backend (`ecommerce-backend`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Payment Gateway**: Stripe API
- **File Uploads**: Cloudinary & Multer
- **Email Service**: Nodemailer

## 📂 Project Structure

```text
mern-ecommerce-app/
├── ecommerce-frontend/    # React frontend application
│   ├── src/               # Source code (components, pages, redux slices, etc.)
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── ecommerce-backend/     # Node.js Express backend application
│   ├── controllers/       # Route controllers (logic)
│   ├── models/            # Mongoose database schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Custom middleware (auth, error handling)
│   ├── utils/             # Helper functions (token generation, email sending)
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
└── README.md
```

## ⚙️ Setup & Installation

Follow these steps to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas URI)
- Stripe Account (for payment processing)
- Cloudinary Account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/Sami-Sial/mern-ecommerce-app.git
cd mern-ecommerce-app
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd ecommerce-backend
npm install
```

Create a `.env` file in the `ecommerce-backend` directory and configure the following environment variables:
```env
PORT=4000
DB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=5d
COOKIE_EXPIRE=5

# Stripe API Keys
STRIPE_API_KEY=your_stripe_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# SMTP Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_app_password
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd ecommerce-frontend
npm install
```

Create a `.env` file in the `ecommerce-frontend` directory to store frontend specific variables (e.g. Stripe Public Key, API Base URL):
```env
VITE_STRIPE_API_KEY=your_stripe_public_key
# Depending on your setup, you might need to set the API endpoint URL
```

Start the frontend development server:
```bash
npm run dev
```
The app will typically be available at `http://localhost:5173/`.

## 📄 License

This project is licensed under the ISC License.
