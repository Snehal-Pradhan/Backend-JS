
---

# Sorting with `sort_by` & `order`

An Express.js + MongoDB route to sort documents dynamically using query parameters.

## 📌 Goal

Sort results using query params like `?sort_by=createdAt&order=desc`.

## 📂 Endpoint

```
GET /products?sort_by=price&order=desc
```

### 🧠 Example Response

```json
[
  {
    "_id": "663bcf123...",
    "name": "Phone",
    "price": 699
  },
  {
    "_id": "663bcc999...",
    "name": "Laptop",
    "price": 1299
  }
]
```

## 🛠️ Code Snippet

```js
app.get('/products', async (req, res) => {
  const sortOptions = {};
  if (req.query.sort_by) {
    sortOptions[req.query.sort_by] = req.query.order === 'desc' ? -1 : 1;
  }

  const products = await Product.find().sort(sortOptions);
  res.json(products);
});
```

## 🎯 What You Learn

* How to implement dynamic sorting using `Model.find().sort()`.
* Building flexible sort logic from `req.query`.

---

Let me know if you want to combine this with filtering or pagination.
