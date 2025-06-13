
# 📋 DoDeck - Task Management API

**DoDeck** is a robust and production-ready backend API for managing personal tasks, built with Node.js, Express, and MongoDB. It follows a modular folder structure with controllers, routes, and environment-based configuration.

## 🚀 Features

- Create, update, delete, and fetch tasks
- Mark tasks as completed or pending
- Set and manage due dates
- Filter tasks by status
- Production-ready structure (routes, controllers, DB config)
- Easily extendable (pagination, auth, tags)

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB** (Mongoose ODM)
- **dotenv**

## 📁 Folder Structure

```
DoDeck/
├── controllers/
│   └── task.controller.js
├── models/
│   └── task.model.js
├── routes/
│   └── task.routes.js
├── config/
│   └── db.js
├── .env
├── index.js
```

## 📦 Installation

```bash
git clone https://github.com/your-username/dodeck.git
cd dodeck
npm install
```

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/dodeck
```

## 🧪 API Endpoints

Base Route: `/api/tasks`

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/create`        | Create a new task        |
| GET    | `/`              | Get all tasks            |
| GET    | `/pending`       | Get all pending tasks    |
| GET    | `/completed`     | Get all completed tasks  |
| PUT    | `/update/:id`    | Update a task by ID      |
| DELETE | `/delete/:id`    | Delete a task by ID      |

## ✅ Task Schema

```js
{
  title: String,        // required
  description: String,
  status: "pending" | "completed", // default: pending
  dueDate: Date,
  createdAt: Date,      // auto via timestamps
}
```

## 🎯 Future Improvements

- Pagination (`/tasks?page=1&limit=10`)
- Authentication & user management
- Priority tags & reminders
- Due soon/today filters

## 📄 License

MIT

---

**Made with ❤️ by Snehal Pradhan**
