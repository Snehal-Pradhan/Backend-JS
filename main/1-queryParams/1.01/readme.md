

# Echo Query Params (Basic)

A simple Express.js project that reads and returns query parameters from a GET request.

## 📌 Goal

Echo back query parameters passed to the endpoint.

## 📂 Endpoint

```
GET /api/echo?name=John&city=NY
```

### 🧠 Example Response

```json
{
  "name": "John",
  "city": "NY"
}
```

## 🛠️ Code Snippet

```js
app.get('/api/echo', (req, res) => {
  res.json(req.query);
});
```

## 🎯 What You Learn

* Accessing `req.query` in Express to handle query parameters.

---