# Fragrance E-Commerce Platform (MERN Stack)

A full-stack fragrance e-commerce web application built using the MERN stack.  
This project includes secure authentication, email verification, password recovery, and a professional landing page.

---

## 🚀 Features Implemented

### ✅ Authentication System
- User Signup with Email OTP Verification
- Secure Login with JWT
- Logout
- Protected Routes
- Forgot Password (Reset via Email Link)
- Password Encryption (bcrypt)

### ✅ User Interface
- Professional Navbar
- Responsive Home Page
- Hero Section
- Featured Products
- Categories Section
- Why Choose Us Section
- Footer

### ✅ Security
- JWT Authentication
- Encrypted Passwords
- Expiring Reset Tokens
- Protected APIs

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- CSS (Custom Styling)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- Nodemailer
- bcrypt
- dotenv

- fragrance-ecommerce-mern/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ └── index.css
│ └── main.jsx
│
└── README.md

---
Authentication Flow

User registers

OTP sent to email

User verifies OTP

Login enabled

JWT token generated

User can access protected pages

Forgot password sends reset link

User resets password via email link
## 📂 Project Structure

