# MediConnect API Testing Guide

## 🧪 Quick API Tests

### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "MediConnect API is running",
  "timestamp": "2025-12-16T..."
}
```

---

### 2. Register New Patient
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "role": "patient",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "password": "password123",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "medicalHistory": {
      "bloodType": "O+",
      "allergies": "Peanuts",
      "currentMedications": "None",
      "chronicConditions": "None",
      "previousSurgeries": "Appendectomy (2015)"
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 2,
    "role": "patient",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Login as Admin
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mediconnect.com",
    "password": "admin123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "role": "admin",
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@mediconnect.com",
    "phone": "1234567890",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**💡 Copy the token from the response for next requests!**

---

### 4. Create Consultation (Patient)
```bash
# Replace YOUR_PATIENT_TOKEN with token from step 2
curl -X POST http://localhost:3000/api/consultations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_PATIENT_TOKEN" \
  -d '{
    "consultationType": "online",
    "urgencyLevel": "normal",
    "symptoms": "Fever and headache for 3 days",
    "preferredDate": "2025-12-20",
    "preferredTime": "14:00"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Consultation request created successfully",
  "data": {
    "id": 1,
    "patientId": 2,
    "consultationType": "online",
    "urgencyLevel": "normal",
    "status": "pending"
  }
}
```

---

### 5. Get All Consultations (Admin)
```bash
# Replace YOUR_ADMIN_TOKEN with token from step 3
curl http://localhost:3000/api/consultations \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "patient_id": 2,
      "consultation_type": "online",
      "urgency_level": "normal",
      "symptoms": "Fever and headache for 3 days",
      "preferred_date": "2025-12-20",
      "preferred_time": "14:00:00",
      "status": "pending",
      "admin_notes": null,
      "created_at": "2025-12-16T...",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone": "9876543210",
      "allergies": "Peanuts",
      "current_medications": "None",
      "chronic_conditions": "None",
      "previous_surgeries": "Appendectomy (2015)"
    }
  ]
}
```

---

### 6. Update Consultation Status (Admin)
```bash
# Replace YOUR_ADMIN_TOKEN and :id with actual values
curl -X PUT http://localhost:3000/api/admin/consultations/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "status": "approved",
    "adminNotes": "Consultation approved. Video link will be shared."
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Consultation approved successfully",
  "data": {
    "id": 1,
    "status": "approved"
  }
}
```

---

### 7. Get Dashboard Stats (Admin)
```bash
curl http://localhost:3000/api/admin/stats \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "total": 1,
    "pending": 0,
    "approved": 1,
    "rejected": 0,
    "completed": 0,
    "totalPatients": 1,
    "emergencyPending": 0
  }
}
```

---

### 8. Get User Profile
```bash
curl http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "role": "patient",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "created_at": "2025-12-16T...",
    "address": {
      "id": 1,
      "user_id": 2,
      "address": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    },
    "medicalHistory": {
      "id": 1,
      "user_id": 2,
      "blood_type": "O+",
      "allergies": "Peanuts",
      "current_medications": "None",
      "chronic_conditions": "None",
      "previous_surgeries": "Appendectomy (2015)"
    }
  }
}
```

---

## 🔍 Filter & Search Examples

### Get Pending Consultations Only
```bash
curl "http://localhost:3000/api/consultations?status=pending" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Get Emergency Consultations
```bash
curl "http://localhost:3000/api/consultations?urgencyLevel=emergency" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## ❌ Error Response Examples

### 401 Unauthorized (No Token)
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 400 Bad Request (Validation Error)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### 403 Forbidden (Wrong Role)
```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Consultation not found"
}
```

---

## 📱 Postman Collection

Create a new Postman collection with these settings:

### Collection Variables
- `baseUrl`: `http://localhost:3000/api`
- `adminToken`: (set after admin login)
- `patientToken`: (set after patient login)

### Requests

1. **Health Check**
   - GET `{{baseUrl}}/health`

2. **Admin Login**
   - POST `{{baseUrl}}/auth/login`
   - Body: `{"email":"admin@mediconnect.com","password":"admin123"}`
   - Tests: `pm.collectionVariables.set("adminToken", pm.response.json().data.token)`

3. **Register Patient**
   - POST `{{baseUrl}}/auth/register`
   - Body: See example above
   - Tests: `pm.collectionVariables.set("patientToken", pm.response.json().data.token)`

4. **Create Consultation**
   - POST `{{baseUrl}}/consultations`
   - Headers: `Authorization: Bearer {{patientToken}}`
   - Body: See example above

5. **Get Consultations**
   - GET `{{baseUrl}}/consultations`
   - Headers: `Authorization: Bearer {{adminToken}}`

6. **Update Status**
   - PUT `{{baseUrl}}/admin/consultations/1/status`
   - Headers: `Authorization: Bearer {{adminToken}}`
   - Body: `{"status":"approved","adminNotes":"Approved"}`

7. **Get Stats**
   - GET `{{baseUrl}}/admin/stats`
   - Headers: `Authorization: Bearer {{adminToken}}`

---

## 🧪 Testing Workflow

### Complete Flow Test

1. **Register a patient** → Get patient token
2. **Login as admin** → Get admin token
3. **Create consultation** (as patient)
4. **Get all consultations** (as admin)
5. **Update status to approved** (as admin)
6. **Get stats** (as admin)
7. **Get profile** (as patient)

### Expected Database State After Flow

**users table:**
- 2 users (1 admin, 1 patient)

**consultations table:**
- 1 consultation (status: approved)

**admin_logs table:**
- 1 log entry (action: approved)

**patient_address table:**
- 1 address record

**medical_history table:**
- 1 medical history record

---

## 💻 PowerShell Testing Script

Save as `test-api.ps1`:

```powershell
# Test MediConnect API

$baseUrl = "http://localhost:3000/api"

Write-Host "1. Testing Health Check..." -ForegroundColor Green
Invoke-RestMethod -Uri "$baseUrl/health" -Method Get | ConvertTo-Json

Write-Host "`n2. Admin Login..." -ForegroundColor Green
$adminLogin = @{
    email = "admin@mediconnect.com"
    password = "admin123"
} | ConvertTo-Json

$adminResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
    -Method Post `
    -Body $adminLogin `
    -ContentType "application/json"

$adminToken = $adminResponse.data.token
Write-Host "Admin Token: $adminToken"

Write-Host "`n3. Getting Consultations..." -ForegroundColor Green
$headers = @{
    Authorization = "Bearer $adminToken"
}

Invoke-RestMethod -Uri "$baseUrl/consultations" `
    -Method Get `
    -Headers $headers | ConvertTo-Json -Depth 10

Write-Host "`n4. Getting Dashboard Stats..." -ForegroundColor Green
Invoke-RestMethod -Uri "$baseUrl/admin/stats" `
    -Method Get `
    -Headers $headers | ConvertTo-Json

Write-Host "`nAll tests completed!" -ForegroundColor Cyan
```

Run with:
```powershell
.\test-api.ps1
```

---

## 🎯 Success Criteria

✅ All API endpoints return 200/201 status codes  
✅ JWT tokens are generated and validated  
✅ Database records are created correctly  
✅ Authorization checks work (admin vs patient)  
✅ Validation catches invalid inputs  
✅ Socket.io events are emitted  
✅ Error responses are properly formatted  

Happy Testing! 🚀
