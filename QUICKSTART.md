# MediConnect - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Start MySQL
Make sure MySQL is running on your system (port 3306).

### Step 2: Start Backend

Open a terminal:

```bash
cd backend
npm install
node scripts/initDb.js
npm run dev
```

✅ Backend will be running at `http://localhost:3000`

### Step 3: Start Frontend

Open a new terminal:

```bash
npm install
npm run dev
```

✅ Frontend will be running at `http://localhost:5173`

### Step 4: Test the Application

1. **Visit** `http://localhost:5173`
2. **Click** "Book Consultation" to register as a patient
3. **Fill** the registration form and submit
4. **Login** as admin:
   - Go to Admin Login
   - Email: `admin@mediconnect.com`
   - Password: `admin123`
5. **View** and manage consultation requests

## 🧪 Testing the API

### Test Health Check
```bash
curl http://localhost:3000/api/health
```

### Test Admin Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"admin@mediconnect.com\", \"password\": \"admin123\"}"
```

### Test Get Consultations (with token)
```bash
curl http://localhost:3000/api/consultations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 📊 Database Access

To access the database directly:

```bash
mysql -u root -p
```

Password: `Aditya.254`

```sql
USE mediconnect_db;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM consultations;
```

## 🔧 Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify credentials in `backend/.env`
- Make sure port 3000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check `.env` file has correct `VITE_API_BASE_URL`
- Restart frontend dev server after changing `.env`

### Database connection error
- Verify MySQL is running
- Check MySQL credentials in `backend/.env`
- Run `node scripts/initDb.js` to initialize database

## 📝 Important Files

- `backend/.env` - Backend configuration
- `.env` - Frontend configuration
- `backend/scripts/initDb.js` - Database initialization
- `database.txt` - Database schema

## 🎯 What's Working

✅ Patient registration with medical history  
✅ Admin authentication  
✅ Consultation CRUD operations  
✅ Real-time Socket.io connection  
✅ Role-based access control  
✅ Search and filter consultations  
✅ Status management (approve/reject)  
✅ Responsive UI  

## 📚 Next Steps

- Integrate frontend forms with backend API
- Implement WebRTC for video calls
- Add email notifications
- Deploy to production server

## 💡 Tips

- Use Postman or Thunder Client to test APIs
- Check browser console for frontend errors
- Check terminal for backend logs
- Use `nodemon` for auto-reload during development
- Keep both terminals open to see real-time logs

Enjoy building with MediConnect! 🏥
