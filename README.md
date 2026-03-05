# 📝 Full-Stack Task Manager

A responsive, MERN-stack task management application that allows users to organize their daily activities with full CRUD (Create, Read, Update, Delete) functionality.

## 🚀 Demo

**[Watch the Demo Video](https://drive.google.com/file/d/1svhDNDgaHL6pkhh7011zswyBuGq6dMfw/view?usp=sharing)**

---

## 🛠 Features

* **Full CRUD**: Create, view, edit, and delete tasks.
* **Status Management**: Toggle tasks between **Pending** and **Completed**.
* **Smart Sorting**: Newest tasks automatically appear at the top.
* **Responsive Design**: Optimized for Desktop, Tablet, and Mobile using Tailwind CSS.
* **Form Validation**: Prevents empty task titles.
* **Visual Indicators**: Distinct styling for completed tasks to track progress at a glance.

---

## 🏗 Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios

**Backend:** Node.js, Express.js

**Database:** MongoDB (Mongoose ODM)

**Architecture:** MVC (Model-View-Controller)

---

## 📋 Prerequisites

* Node.js (v14 or higher)
* npm or yarn

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kavindisathsarani/Simple-Task-Manager.git
cd task-manager

```

### 2. Backend Setup

1. Navigate to the server directory:
```bash
cd server

```


2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file in the `server` root:
```env
PORT=5000
MONGO_URI= your_URL

```


4. Start the server:
```bash
npm start

```



### 3. Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client

```


2. Install dependencies:
```bash
npm install

```


3. Start the React app:
```bash
npm start

```



---

## 📂 Folder Structure

```text
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── App.js         # Main logic & API calls
│   │   └── index.css      # Tailwind styles
├── server/                # Node/Express Backend
│   ├── models/            # Mongoose Schema (Task.js)
│   ├── controllers/       # Route logic
│   ├── routes/            # API Endpoints
│   └── server.js          # Entry point
└── README.md

```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/tasks` | Retrieve all tasks (sorted by latest) |
| **POST** | `/tasks` | Create a new task |
| **PUT** | `/tasks/:id` | Update task title, desc, or status |
| **DELETE** | `/tasks/:id` | Remove a task |

