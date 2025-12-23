# MediConnect

**MediConnect** is a simple frontend prototype of an online medical consultation platform where patients can book online video consultations or offline appointments, and admins can manage requests from a secure dashboard.

---

## 🚀 Project Overview

MediConnect streamlines doctor–patient interactions by allowing patients to submit consultation requests with medical details, while admins can review, approve, or reject them.

This project currently works as a **frontend-only prototype** using `localStorage` for data handling and is ready for backend integration.

---

## ✨ Key Features

### 👤 Patient Side

* Patient registration with real-time form validation
* Medical history input (allergies, medications, conditions, surgeries)
* Choose consultation type: **Online (Video)** or **Offline (In-person)**
* Set urgency level: Normal / Urgent / Emergency
* Select preferred consultation date & time

### 🛠️ Admin Side

* Secure admin login
* View all consultation requests
* Search & filter by patient name, email, or status
* Approve or reject consultations
* View complete patient and medical details

### 🔐 Security (Prototype Ready)

* Input validation & sanitization
* Role-based access control (Admin / Patient)
* XSS protection through input sanitization

---

## 🧰 Tech Stack

**Frontend**

* React 19
* React Router 7
* Vite
* CSS3
* Axios (ready for API integration)
* Socket.io Client (for video and chat - backend integration needed)

**Backend (Planned)**

* Node.js + Express
* MySQL
* Socket.io Server
* Video SDK for conferencing

---

## ⚙️ Installation & Run

### Prerequisites

* Node.js v18+
* MySQL v8.0+
* npm or yarn

### Frontend Setup

1. **Navigate to the project directory:**

```bash
cd "c:\Users\adity\Desktop\jaymin SN"
```

2. **Install frontend dependencies:**

```bash
npm install
```

3. **Create `.env` file (or copy from `.env.example`):**

```env
VITE_SOCKET_URL=http://localhost:3000
VITE_API_BASE_URL=http://localhost:3000/api
```

4. **Start the frontend development server:**

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory:**

```bash
cd backend
```

2. **Install backend dependencies:**

```bash
npm install
```

3. **Create `.env` file in backend directory:**

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Aditya.254
DB_NAME=mediconnect_db
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:5173
```

4. **Initialize the database:**

```bash
node scripts/initDb.js
```

This creates the database, tables, and default admin user.

5. **Start the backend server:**

```bash
npm run dev
```

Backend API will be available at: `http://localhost:3000`

---

## 🔑 Demo Admin Credentials

### Frontend Demo (localStorage)
* **Username:** admin
* **Password:** admin123

### Backend API (Database)
* **Email:** admin@mediconnect.com
* **Password:** admin123

---

## 📁 Project Structure

```
mediconnect/
├── backend/                    # Node.js Backend
│   ├── config/
│   │   └── database.js        # MySQL connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── consultationController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   └── validator.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── consultationRoutes.js
│   │   ├── adminRoutes.js
│   │   └── userRoutes.js
│   ├── scripts/
│   │   └── initDb.js          # Database initialization
│   ├── server.js              # Main server file
│   ├── package.json
│   └── .env
├── src/                        # React Frontend
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── PatientRegistration.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── NotFound.jsxwith React 19
* ✅ Complete backend API with Node.js + Express
* ✅ MySQL database integration
* ✅ JWT authentication implemented
* ✅ Socket.io real-time features
* ✅ Responsive design (Desktop, Tablet, Mobile)
* ✅ Form validation and input sanitization
* ✅ Admin dashboard with search and filter
* ✅ RESTful API with role-based access control
│   │   └── validation.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── database.txt               # Database schema
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📌 Current Status

* ✅ Fully functional frontend prototype
* ✅ Uses `localStorage` for persistence
* ✅ Responsive design (Desktop, Tablet, Mobile)
* ✅ Form validation and input sanitization
* ✅ Admin dashboard with search and filter
* ✅ Socket.io client setup (requires backend)

---
✅ ~~Backend API integration~~ (COMPLETED)
* ✅ ~~Database integration~~ (COMPLETED)
* ✅ ~~JWT authentication~~ (COMPLETED)
* ✅ ~~Socket.io real-time features~~ (COMPLETED)
* WebRTC video consultation implementation
* Email & SMS notifications
* Payment gateway integration
* Prescription management system
* Medical record file uploads
* Multi-language support
* Doctor profiles and scheduling
* Appointment reminders
* Multi-language support
* JWT authentication
* Real-time notifications using Socket.io

---

## 🛠️ Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npmAPI Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user (Protected)

### Consultation Endpoints
- `GET /consultations` - Get all consultations (Protected)
- `POST /consultations` - Create consultation (Protected)
- `GET /consultations/:id` - Get single consultation (Protected)
- `PUT /consultations/:id` - Update consultation (Protected)
- `DELETE /consultations/:id` - Delete consultation (Protected)

### Admin Endpoints (Admin Only)
- `PUT /admin/consultations/:id/status` - Update consultation status
- `DELETE /admin/consultations/:id` - Delete consultation
- `GET /admin/stats` - Get dashboard statistics
- `GET /admin/logs` - Get admin action logs
- `GET /admin/patients` - Get all patients

### User Endpoints
- `GET /users/profile` - Get user profile (Protected)
- `PUT /users/profile` - Update profile (Protected)
- `PUT /users/medical-history` - Update medical history (Patient)

For detailed API documentation, see [backend/README.md](backend/README.md)g logic

3. **Database:**
   - Replace localStorage with API calls
   - Implement proper data persistence
   - Add user authentication

---

## 📄 License

MIT License

---

## 📢 Note

This is a **prototype**. For production use:
- Integrate a backend with proper authentication
- Use a database instead of localStorage
- Implement HTTPS and secure communication
- Ensure compliance with healthcare regulations (HIPAA, GDPR)
- Add proper error handling and logging
- Implement rate limiting and security measures

---

## 👨‍💻 Development

Created with React 19 and Vite for fast development and optimal performance.

For questions or contributions, feel free to open an issue or pull request.

---

## 🎉 Getting Started

1. Visit `http://localhost:5173` after starting the dev server
2. Click "Book Consultation" to register as a patient
3. Fill in the registration form with your details
4. Submit the consultation request
5. Login as admin (username: admin, password: admin123)
6. View and manage consultation requests from the dashboard

Enjoy using MediConnect! 🏥
