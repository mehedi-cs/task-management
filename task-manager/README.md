# 🧾 Task Management API

A simple **Node.js + Express** backend developed for **CSE 362 – Web Programming II Lab** at **Jahangirnagar University**.
This project demonstrates backend server setup, route organization, and building RESTful API endpoints for basic task management.

---

## 🚀 Features

* ⚙️ Node.js + Express server
* 📁 Organized project structure (`src/` directory)
* 🛣️ REST API for task management
* 🔀 Express Router usage (`routes/tasks.js`)
* 🩺 Health check API (`/health`)
* ⚠️ Error handling + ID validation
* 🧪 Tested with Postman
* 📝 Git version control setup

---

## 📁 Project Structure

```
task-management/
│
├── package.json
├── README.md
└── src/
    ├── index.js
    └── routes/
        └── tasks.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Node.js

Download and install **Node.js (LTS)** from:
[https://nodejs.org](https://nodejs.org)

Verify installation:

```bash
node -v
npm -v
```

---

### 2️⃣ Initialize the Project

```bash
mkdir task-management
cd task-management
npm init -y
npm install express
mkdir src
type nul > src\index.js     # Windows users
```

> On macOS/Linux use:
> `touch src/index.js`

---

### 3️⃣ Run the Server

Add this script in **package.json**:

```json
"scripts": {
  "start": "node src/index.js"
}
```

Start the server:

```bash
npm start
```

Now visit:

👉 [http://localhost:3000/](http://localhost:3000/)

You should see:
`"Task Management API is running!"`

---

## 🧩 API Endpoints

| Endpoint    | Method | Description                     |
| ----------- | ------ | ------------------------------- |
| `/`         | GET    | Test route, confirms API status |
| `/tasks`    | GET    | Returns a list of all tasks     |
| `/task/:id` | GET    | Returns a task by ID or error   |
| `/health`   | GET    | Returns server health & uptime  |

---

## 🧠 Example Responses

### **GET /tasks**

```json
[
  { "id": 1, "title": "Learn Node.js", "completed": false, "priority": "high", "createdAt": "2025-11-02T10:00:00Z" },
  { "id": 2, "title": "Build REST API", "completed": false, "priority": "medium", "createdAt": "2025-11-02T10:00:00Z" }
]
```

### **GET /health**

```json
{
  "status": "healthy",
  "uptime": 23.45
}
```

---

## 🧪 Testing With Postman

Use these requests to test the API:

* `GET http://localhost:3000/`
* `GET http://localhost:3000/tasks`
* `GET http://localhost:3000/task/1`
* `GET http://localhost:3000/health`

---

## 🧰 Git Setup

```bash
git init
echo "node_modules/" > .gitignore
git add .
git commit -m "Initial setup of Node.js and Express server with routes"
git branch features/routes
git push origin features/routes
```

---

## 🏁 Expected Outcome

After completing this lab you will:

* ✔️ Build a working Node.js + Express REST API
* ✔️ Understand project structure and routing
* ✔️ Test APIs using Postman
* ✔️ Use Git for proper version control

---

## 👨‍💻 Developed By

**Mehedi Hasan**
CSE 362 – Web Programming II Lab
Department of CSE, Jahangirnagar University

---
