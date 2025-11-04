# 🧾 Task Management API

A simple **Node.js + Express** project developed as part of **CSE 362 – Web Programming II Lab** at **Jahangirnagar University**.
This lab demonstrates how to set up a backend server, organize routes, and build RESTful API endpoints for basic task management.

---

## 🚀 Features

* Node.js and Express server setup
* Basic project folder structure (`src/` directory)
* REST API endpoints for task management
* Example of Express Router usage
* Health check endpoint
* Error handling and ID validation
* Tested using Postman
* Git version control setup

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

Download and install Node.js (LTS version) from [https://nodejs.org](https://nodejs.org).

Verify installation:

```bash
node -v
npm -v
```

### 2️⃣ Initialize Project

```bash
mkdir task-management
cd task-management
npm init -y
npm install express
mkdir src
type nul > src\index.js
```

### 3️⃣ Run the Server

Add this script in your **package.json**:

```json
"scripts": {
  "start": "node src/index.js"
}
```

Then start the server:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to check if it’s running.

---

## 🧩 API Endpoints

| Endpoint    | Method | Description                      | Example Response                                 |
| ----------- | ------ | -------------------------------- | ------------------------------------------------ |
| `/`         | GET    | Test route                       | `"Task Management API is running!"`              |
| `/tasks`    | GET    | Returns list of all tasks        | `[ { "id": 1, "title": "Learn Node.js", ... } ]` |
| `/task/:id` | GET    | Returns a task by ID or error    | `{ "id": 1, "title": "Learn Node.js" }`          |
| `/health`   | GET    | Returns server health and uptime | `{ "status": "healthy", "uptime": 10.23 }`       |

---

## 🧠 Example Output

### `/tasks`

```json
[
  { "id": 1, "title": "Learn Node.js", "completed": false, "priority": "high", "createdAt": "2025-11-02T10:00:00Z" },
  { "id": 2, "title": "Build REST API", "completed": false, "priority": "medium", "createdAt": "2025-11-02T10:00:00Z" }
]
```

### `/health`

```json
{ "status": "healthy", "uptime": 23.45 }
```

---

## 🧪 Testing with Postman

* **GET** `http://localhost:3000/` → check API running
* **GET** `http://localhost:3000/tasks` → get all tasks
* **GET** `http://localhost:3000/task/1` → get task by ID
* **GET** `http://localhost:3000/health` → check server uptime

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

By completing this lab, you will:

* Have a fully working Node.js + Express REST API
* Understand project structure and routing
* Practice testing APIs using Postman
* Use Git for version control following best practices

---

**Developed by:**
👨‍💻 *Mehedi Hasan*
📚 *CSE 362 – Web Programming II Lab*
🏫 *Department of CSE, Jahangirnagar University*
