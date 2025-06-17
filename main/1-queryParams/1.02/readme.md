
# Hardcoded Data Filtering

An Express.js route that filters mock user data based on query parameters.

## 📌 Goal

Filter users using the `?role=` query parameter.

## 📂 Endpoint

```
GET /users?role=admin
```

### 🧠 Example Response

```json
[
  { "id": 1, "name": "Alice", "role": "admin" }
]
```

## 🛠️ Code Snippet

```js
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" }
];

app.get('/users', (req, res) => {
  const filteredUsers = req.query.role 
    ? users.filter(u => u.role === req.query.role) 
    : users;
  res.json(filteredUsers);
});
```

## 🎯 What You Learn

* Using `Array.prototype.filter()` for basic filtering logic.
* Accessing and using `req.query` in Express.

---
