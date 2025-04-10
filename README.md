# 🛍️ PurelyPicked – Full Stack E-Commerce Web Application

**PurelyPicked** is a modern, responsive full-stack e-commerce website built using the MERN stack and deployed on Vercel. Users can browse curated products, add items to their cart, and complete a secure checkout process powered by Stripe.

<br>

## 🌐 Live Demo

🔗 [Visit PurelyPicked](https://purelypicked-frontend.vercel.app)

---

## 🧰 Tech Stack

### 🖥️ Frontend
- React
- React Router
- Context API (State Management)
- CSS Modules / Custom Styling
- Axios (for API requests)
- Vercel (Deployment)

### ⚙️ Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT (Authentication)
- Cloudinary (Image storage)
- Multer (Image upload handling)
- Stripe (Payment Gateway)
- bcryptjs (Password hashing)
- dotenv (Environment management)
- Cookie-parser
- CORS
- Nodemon (Dev)

---

## 🔐 Features

- 🔍 Browse product listings with detailed views
- 🛒 Add to cart, update quantity, and remove items
- 🔐 User authentication using JWT tokens
- 📦 Admin access for product management (optional if implemented)
- 💳 Secure Stripe-based checkout integration
- 🌩️ Product image storage via Cloudinary
- 📁 Upload product images using Multer
- 📱 Fully responsive for mobile & desktop

---

## 🛠️ Installation

### Clone the repo

```bash
git clone https://github.com/your-username/purelypicked.git
cd purelypicked
---

### ⚙️ SETUP THE BACKEND

```bash
cd backend
npm install
npm run start

---

MONGO_URI

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

STRIPE_SECRET_KEY

JWT_SECRET



SETUP THE FRONTEND

cd frontend
npm install
npm start


 Folder Structure

purelypicked/
├── backend/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   └── models/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── App.js

