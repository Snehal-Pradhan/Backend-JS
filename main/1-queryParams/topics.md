**Node.js + Express + MongoDB**,focusing on query params with increasing complexity. We’ll integrate MongoDB queries progressively.

---

### **1. Echo Query Params (Basic)**  
**Goal**: Read and return query params.  
**Endpoint**:  
```javascript
// GET /api/echo?name=John&city=NY
app.get('/api/echo', (req, res) => {
  res.json(req.query); // { name: "John", city: "NY" }
});
```
**Learn**:  
- Accessing `req.query` in Express.  

---

### **2. Hardcoded Data Filtering**  
**Goal**: Filter an array of mock users using `?role=admin`.  
**Example**:  
```javascript
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" }
];

// GET /users?role=admin
app.get('/users', (req, res) => {
  const filteredUsers = req.query.role 
    ? users.filter(u => u.role === req.query.role) 
    : users;
  res.json(filteredUsers);
});
```
**Learn**:  
- Basic filtering logic with `Array.filter()`.  

---

### **3. MongoDB Find with Query Params**  
**Goal**: Fetch documents from MongoDB using `?status=active`.  
**Example**:  
```javascript
// GET /tasks?status=completed
app.get('/tasks', async (req, res) => {
  const query = req.query.status ? { status: req.query.status } : {};
  const tasks = await Task.find(query); // MongoDB query
  res.json(tasks);
});
```
**Learn**:  
- Passing query params to `Model.find()`.  

---

### **4. Pagination with `page` & `limit`**  
**Goal**: Use `?page=2&limit=5` to paginate MongoDB results.  
**Code**:  
```javascript
// GET /posts?page=1&limit=10
app.get('/posts', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find().skip(skip).limit(limit);
  res.json(posts);
});
```
**Learn**:  
- MongoDB’s `skip()` and `limit()`.  

---

### **5. Sorting with `sort_by` & `order`**  
**Goal**: Sort results with `?sort_by=createdAt&order=desc`.  
**Code**:  
```javascript
// GET /products?sort_by=price&order=desc
app.get('/products', async (req, res) => {
  const sortOptions = {};
  if (req.query.sort_by) {
    sortOptions[req.query.sort_by] = req.query.order === 'desc' ? -1 : 1;
  }

  const products = await Product.find().sort(sortOptions);
  res.json(products);
});
```
**Learn**:  
- Dynamic sorting with `Model.sort()`.  

---

### **6. Combined Filtering (AND/OR)**  
**Goal**: Support multiple filters like `?role=admin&age_gte=30`.  
**Code**:  
```javascript
// GET /users?role=admin&age_gte=30
app.get('/users', async (req, res) => {
  const query = {};
  if (req.query.role) query.role = req.query.role;
  if (req.query.age_gte) query.age = { $gte: parseInt(req.query.age_gte) };

  const users = await User.find(query);
  res.json(users);
});
```
**Learn**:  
- MongoDB comparison operators (`$gte`, `$lte`).  

---

### **7. Input Validation with Joi**  
**Goal**: Validate `?page` (must be number) and `?limit` (max 100).  
**Code**:  
```javascript
const schema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

// GET /books?page=abc → Error!
app.get('/books', async (req, res) => {
  const { error, value } = schema.validate(req.query);
  if (error) return res.status(400).json({ error: error.details });

  const books = await Book.find()
    .skip((value.page - 1) * value.limit)
    .limit(value.limit);
  res.json(books);
});
```
**Learn**:  
- Schema validation with `Joi` or `express-validator`.  

---

### **8. Full-Text Search with `?q=`**  
**Goal**: Implement search using MongoDB’s text index.  
**Setup**:  
```javascript
// In Product schema:
productSchema.index({ name: 'text', description: 'text' });

// GET /products?q=phone
app.get('/products', async (req, res) => {
  const products = await Product.find({
    $text: { $search: req.query.q }
  });
  res.json(products);
});
```
**Learn**:  
- MongoDB text indexes and `$text` queries.  

---

### **9. Complex Queries (Date Ranges, Arrays)**  
**Goal**: Support `?date[gte]=2024-01-01&tags[in]=js,node`.  
**Code**:  
```javascript
// GET /events?date[gte]=2024-01-01&tags[in]=js,node
app.get('/events', async (req, res) => {
  const query = {};
  if (req.query.date?.gte) query.date = { $gte: new Date(req.query.date.gte) };
  if (req.query.tags?.in) query.tags = { $in: req.query.tags.in.split(',') };

  const events = await Event.find(query);
  res.json(events);
});
```
**Learn**:  
- Nested query params and MongoDB operators (`$in`, `$elemMatch`).  

---

### **10. Real-World API: Build a "Shopify-like" API**  
**Goal**: Combine all concepts into a product API with:  
- Filtering: `?category=electronics&price_lte=1000`  
- Sorting: `?sort_by=price&order=desc`  
- Pagination: `?page=2&limit=12`  
- Search: `?q=wireless`  
**Example**:  
```javascript
app.get('/api/products', async (req, res) => {
  // 1. Validate input (Joi)
  // 2. Build dynamic MongoDB query
  // 3. Return paginated, sorted, filtered results
});
```
**Learn**:  
- Architecting scalable query param handling.  

---

### **Bonus (Expert)**  
- **Caching**: Cache responses with Redis using query params as cache keys.  
- **URL Whitelisting**: Allow only specific params (e.g., prevent NoSQL injection).  

---

### **MongoDB Tips**  
1. Use `$eq`, `$ne`, `$in`, `$gte`, `$lte` for advanced queries.  
2. For performance, add indexes to frequently queried fields (e.g., `productSchema.index({ price: 1 })`).  

Let me know if you’d like a deeper dive into any project! 🚀