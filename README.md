# Best Price Store — Project Phase 3 (Fall 2025)

## Overview
This project implements a **web interface** for the *Best Price Grocery Store* database.  
It allows users to:
1. Search for an item by ID or name  
2. Insert a new item (“Frozen Broccoli”)  
3. Update the inserted item to “Organic Fresh Broccoli”  
4. Delete the updated item  

The interface connects to a **MySQL database** through a **Node.js + Express** backend, and a **React (Vite)** frontend.

---

## Folder Structure
```
DATABASE-PHASE3/
├── backend/
│   ├── db/
│   │   └── connection.js
│   ├── routes/
│   │   └── item.routes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 1. Backend Setup

### 🧱 Prerequisites
- Node.js installed  
- MySQL running locally (e.g., via XAMPP, WAMP, or MySQL Workbench)

### Navigate to backend
```bash
cd backend
```

### Install dependencies
```bash
npm install
```

### Configure environment variables
Create a file named `.env` in the **backend** folder:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=         # (leave blank if no password)
DB_NAME=BESTPRICESTORE
```

### Set up your database
1. Open **phpMyAdmin** or **MySQL Workbench**  
2. Create a database named `BESTPRICESTORE`
3. Import the `.sql` file you exported from phase 2

### Run the backend server
```bash
node server.js
```

You should see:
```
Server running on port 5000
Connected to MySQL database
```

---

## 2. Frontend Setup

### Navigate to frontend
```bash
cd ../frontend
```

### Install dependencies
```bash
npm install
```

### Configure frontend environment file
Create a file named `.env` in the **frontend** folder:
```env
VITE_API_URL=http://localhost:5000
```

### Run the frontend
```bash
npm run dev
```

By default, the app will run at:  
👉 [http://localhost:5173](http://localhost:5173)

---





## Team Info
**Team Members:**  
- Anmol Pandey — 1002238948  
- Pranil Lama 

**Course:** CSE 3330 — Database Systems  
**Semester:** Fall 2025  
**Instructor:** Ravi Badrachalam
