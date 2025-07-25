# Simple Task Manager Backend

This is a backend API for a **Simple Task Management System** developed as part of the **Fetan Systems Technology Internship Test Project**. The API supports **user authentication** and **task management** operations.

---

## 🚀 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** bcrypt for password hashing, CORS enabled for all origins

---

## ✅ Features Implemented
### **Authentication**
- `POST /auth/signup` → Register with name, email, and password
- `POST /auth/login` → Login with email and password
- JWT-based authentication for protected routes
- Passwords securely hashed using bcrypt

### **User API**
- `GET /profile` → Returns authenticated user’s profile (name, email)

### **Task APIs**
- `POST /tasks` → Create a task  
  **Payload:**  
  ```json
  { "name": "Task Name" }
