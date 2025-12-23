# MediConnect - System Architecture

## 🏗️ Architecture Overview

MediConnect follows a **client-server architecture** with a React frontend and Node.js backend, connected via RESTful APIs and Socket.io for real-time communication.

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         React 19 + Vite Frontend                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │   │
│  │  │  Pages   │  │ Services │  │  Utils   │         │   │
│  │  │  - Home  │  │ - API    │  │ - Valid. │         │   │
│  │  │  - Reg.  │  │ - Socket │  │          │         │   │
│  │  │  - Admin │  │ - Storage│  │          │         │   │
│  │  └──────────┘  └──────────┘  └──────────┘         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │ HTTP/WebSocket
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      SERVER LAYER                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Node.js + Express Backend                    │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │   │
│  │  │  Routes  │  │Controller│  │Middleware│         │   │
│  │  │  - Auth  │  │  - Auth  │  │  - JWT   │         │   │
│  │  │  - Conslt│  │  - Admin │  │  - Valid.│         │   │
│  │  │  - Admin │  │  - User  │  │          │         │   │
│  │  └──────────┘  └──────────┘  └──────────┘         │   │
│  │                                                      │   │
│  │  ┌─────────────────────────────────────┐          │   │
│  │  │      Socket.io Server                │          │   │
│  │  │  - Real-time notifications           │          │   │
│  │  │  - Video call signaling              │          │   │
│  │  │  - Chat messaging                    │          │   │
│  │  └─────────────────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │ SQL Queries
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              MySQL Database                          │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Tables:                                      │  │   │
│  │  │  - users (patients & admins)                 │  │   │
│  │  │  - patient_address                           │  │   │
│  │  │  - medical_history                           │  │   │
│  │  │  - consultations                             │  │   │
│  │  │  - admin_logs                                │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### 1. Patient Registration Flow
```
User → Form Input → Validation → API Call → Backend
                                              ↓
                                    Password Hashing
                                              ↓
                                    Database Insert
                                              ↓
                                    JWT Token Gen.
                                              ↓
User ← Response ← Success/Error ← Backend Response
```

### 2. Admin Authentication Flow
```
Admin → Login Form → Credentials → POST /api/auth/login
                                              ↓
                                    Verify Email
                                              ↓
                                    Compare Password
                                              ↓
                                    Generate JWT
                                              ↓
Admin ← Token + User Data ← Response
     ↓
Store Token → Make Authenticated Requests
```

### 3. Consultation Management Flow
```
Patient → Create Request → POST /api/consultations
                                    ↓
                          JWT Verification
                                    ↓
                          Save to Database
                                    ↓
                          Socket.io Emit
                                    ↓
Admin ← Real-time Notification

Admin → View Requests → GET /api/consultations
                                    ↓
                          JWT Verification
                                    ↓
                          Check Role (admin)
                                    ↓
                          Fetch All Requests
                                    ↓
Admin ← List of Consultations

Admin → Update Status → PUT /api/admin/consultations/:id/status
                                    ↓
                          JWT Verification
                                    ↓
                          Update Database
                                    ↓
                          Log Admin Action
                                    ↓
                          Socket.io Emit
                                    ↓
Patient ← Status Update Notification
```

## 🔐 Security Architecture

### Authentication Flow
```
1. User Login
   ↓
2. Server validates credentials
   ↓
3. Generate JWT with user ID
   ↓
4. Client stores token (localStorage)
   ↓
5. Subsequent requests include: Authorization: Bearer <token>
   ↓
6. Server validates token on each request
   ↓
7. Extract user info from token
   ↓
8. Check user permissions
```

### Password Security
- **Hashing**: bcryptjs with salt rounds
- **Storage**: Only hashed passwords in database
- **Validation**: Minimum 6 characters
- **Comparison**: Secure bcrypt.compare()

### JWT Security
- **Signing**: HMAC-SHA256 algorithm
- **Expiration**: 7 days (configurable)
- **Storage**: LocalStorage (client-side)
- **Transmission**: Authorization header

### Input Validation
```
Client-Side → Basic validation (React)
                    ↓
Server-Side → express-validator (thorough)
                    ↓
Database → Parameterized queries (SQL injection prevention)
```

## 📊 Database Schema

### Entity Relationship Diagram
```
┌─────────────┐
│    users    │
│ ─────────── │
│ id (PK)     │◄──────┐
│ role        │       │
│ first_name  │       │
│ last_name   │       │
│ email       │       │
│ phone       │       │
│ password    │       │
│ created_at  │       │
└─────────────┘       │
       │              │
       │ 1            │
       │              │
       │ n            │
       ├──────────────┼──────────┬────────────┐
       │              │          │            │
       ▼              │          ▼            ▼
┌──────────────┐     │   ┌──────────────┐  ┌──────────────┐
│patient_address     │   │medical_history  │admin_logs│
│──────────────│     │   │──────────────│  │──────────────│
│id (PK)       │     │   │id (PK)       │  │id (PK)       │
│user_id (FK)  │     │   │user_id (FK)  │  │admin_id (FK) │
│address       │     │   │blood_type    │  │consult_id(FK)│
│city          │     │   │allergies     │  │action        │
│state         │     │   │medications   │  │action_time   │
│pincode       │     │   │conditions    │  └──────────────┘
└──────────────┘     │   │surgeries     │         │
                     │   └──────────────┘         │
                     │                            │
                     ▼                            │
              ┌──────────────┐                   │
              │consultations │◄──────────────────┘
              │──────────────│
              │id (PK)       │
              │patient_id(FK)│
              │type          │
              │urgency       │
              │symptoms      │
              │pref_date     │
              │pref_time     │
              │status        │
              │admin_notes   │
              │created_at    │
              └──────────────┘
```

## 🔌 API Architecture

### RESTful API Design
```
/api
├── /auth
│   ├── POST   /register    (Public)
│   ├── POST   /login       (Public)
│   └── GET    /me          (Protected)
│
├── /consultations
│   ├── GET    /            (Protected)
│   ├── POST   /            (Protected - Patient)
│   ├── GET    /:id         (Protected)
│   ├── PUT    /:id         (Protected - Owner)
│   └── DELETE /:id         (Protected - Owner)
│
├── /admin
│   ├── PUT    /consultations/:id/status  (Admin)
│   ├── DELETE /consultations/:id         (Admin)
│   ├── GET    /stats                     (Admin)
│   ├── GET    /logs                      (Admin)
│   └── GET    /patients                  (Admin)
│
└── /users
    ├── GET    /profile              (Protected)
    ├── PUT    /profile              (Protected)
    └── PUT    /medical-history      (Protected - Patient)
```

### Middleware Stack
```
Request
  ↓
CORS Middleware → Allow cross-origin requests
  ↓
Body Parser → Parse JSON bodies
  ↓
Morgan → Log HTTP requests
  ↓
Custom Route Middleware → JWT verification
  ↓
Route Handler → Business logic
  ↓
Response
```

## 🌐 Real-time Communication

### Socket.io Events

**Server Events:**
```javascript
// Emit to all clients
io.emit('new-consultation-request', data)

// Emit to specific room
io.to(roomId).emit('chat-message', message)

// Emit to all except sender
socket.broadcast.emit('user-joined', userData)
```

**Client Events:**
```javascript
// Listen for events
socket.on('consultation-status-update', handleUpdate)

// Emit events
socket.emit('join-video-room', { roomId, userData })
```

### WebRTC Signaling (Planned)
```
Peer A                Server               Peer B
  │                     │                    │
  │──offer────────────►│                    │
  │                     │──offer───────────►│
  │                     │                    │
  │                     │◄─answer───────────│
  │◄─answer────────────│                    │
  │                     │                    │
  │──ice-candidate────►│──ice-candidate───►│
  │◄─ice-candidate─────│◄─ice-candidate────│
  │                     │                    │
  │◄────────Direct P2P Connection─────────►│
```

## 📦 Component Architecture

### Frontend Components
```
App
├── Router
│   ├── Home
│   │   └── Features Grid
│   │
│   ├── PatientRegistration
│   │   ├── Personal Info Form
│   │   ├── Medical History Form
│   │   └── Consultation Details Form
│   │
│   ├── AdminLogin
│   │   └── Login Form
│   │
│   ├── AdminDashboard
│   │   ├── Stats Cards
│   │   ├── Search & Filter
│   │   ├── Consultations Table
│   │   └── Details Panel
│   │
│   └── NotFound
│
├── Services
│   ├── apiService (Axios)
│   ├── socketService (Socket.io)
│   └── storageService (localStorage)
│
└── Utils
    └── validation
```

## 🚀 Deployment Architecture (Recommended)

```
┌─────────────────────────────────────────────┐
│              Load Balancer                   │
│            (nginx/HAProxy)                   │
└─────────────────────────────────────────────┘
              │                │
    ┌─────────┴────────┐  ┌───┴──────────┐
    │                  │  │              │
┌───▼────┐      ┌─────▼──▼──┐    ┌─────▼────┐
│Frontend│      │  Backend  │    │ Backend  │
│ (Static│      │  Server 1 │    │ Server 2 │
│  Files)│      └───────────┘    └──────────┘
└────────┘              │              │
                        └──────┬───────┘
                               │
                        ┌──────▼──────┐
                        │   MySQL     │
                        │   Database  │
                        │  (Primary)  │
                        └─────────────┘
                               │
                        ┌──────▼──────┐
                        │   MySQL     │
                        │  (Replica)  │
                        └─────────────┘
```

## 🔧 Technology Stack Summary

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Styling**: CSS3 (Custom)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Real-time**: Socket.io
- **Logging**: Morgan
- **CORS**: cors package

### Development Tools
- **Backend Dev Server**: Nodemon
- **Frontend Dev Server**: Vite
- **API Testing**: Postman/Thunder Client
- **Database Client**: MySQL Workbench/CLI

## 📈 Scalability Considerations

### Current Capacity
- Single server deployment
- Can handle 100+ concurrent users
- Database connection pooling (10 connections)

### Scale-up Options
1. **Horizontal Scaling**
   - Add more backend servers
   - Use load balancer
   - Implement session store (Redis)

2. **Database Optimization**
   - Read replicas
   - Query optimization
   - Caching layer (Redis)

3. **CDN Integration**
   - Static asset delivery
   - Reduced latency

4. **Microservices** (Future)
   - Auth service
   - Consultation service
   - Notification service
   - Video service

## 🔍 Monitoring & Logging

### Current Implementation
- Console logging (development)
- Morgan HTTP request logging
- Error stack traces

### Recommended Production Setup
- **Application Monitoring**: PM2, New Relic
- **Log Management**: Winston, ELK Stack
- **Error Tracking**: Sentry
- **Performance**: Application Insights
- **Database**: Query performance monitoring

---

This architecture provides a solid foundation for a medical consultation platform that can scale as needed while maintaining security and performance.
