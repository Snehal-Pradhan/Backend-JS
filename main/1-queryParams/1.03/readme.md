
# MongoDB Find with Query Params

Fetch documents from MongoDB using query parameters in an Express.js route.

## 📌 Goal

Use `?status=active` or other query parameters to filter MongoDB documents.

## 📂 Endpoint

```
GET /tasks?status=completed
```

### 🧠 Example Response

```json
[
  {
    "_id": "663abcf342bcd87622ab1f90",
    "title": "Write Report",
    "status": "completed"
  }
]
```

## 🛠️ Code Snippet

```js
app.get('/tasks', async (req, res) => {
  const query = req.query.status ? { status: req.query.status } : {};
  const tasks = await Task.find(query);
  res.json(tasks);
});
```

## 🎯 What You Learn

* Using `req.query` with Mongoose.
* Passing query parameters to `Model.find()` for filtering documents.

---
