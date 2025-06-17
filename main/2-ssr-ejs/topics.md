
---

## **1. Basic EJS Setup (Hello World)**  
**Goal**: Render a simple EJS template with Express.  
**Steps**:  
1. Install EJS:  
   ```bash
   npm install ejs
   ```  
2. Configure Express to use EJS:  
   ```javascript
   app.set('view engine', 'ejs');
   ```  
3. Create `views/index.ejs`:  
   ```html
   <h1>Hello, <%= name %>!</h1>
   ```  
4. Render the template:  
   ```javascript
   app.get('/', (req, res) => {
     res.render('index', { name: 'World' });
   });
   ```  
**Learn**:  
- Basic EJS syntax (`<%= %>` for variables).  
- How Express serves EJS files.  

---

## **2. Dynamic Page Title (Query Params in SSR)**  
**Goal**: Change the page title based on a query param (`?title=Welcome`).  
**Code**:  
```javascript
// GET /?title=Welcome
app.get('/', (req, res) => {
  res.render('index', { title: req.query.title || 'Default Title' });
});
```  
**EJS (`index.ejs`)**:
```html
<title><%= title %></title>
<h1><%= title %></h1>
```  
**Learn**:  
- Passing query params to EJS templates.  

---

## **3. User Profile Page (MongoDB + SSR)**  
**Goal**: Fetch a user from MongoDB and render their profile.  
**Steps**:  
1. Define a `User` model (Mongoose).  
2. Fetch user data:  
   ```javascript
   app.get('/user/:id', async (req, res) => {
     const user = await User.findById(req.params.id);
     res.render('user', { user });
   });
   ```  
3. Render in `user.ejs`:  
   ```html
   <h1><%= user.name %></h1>
   <p>Email: <%= user.email %></p>
   ```  
**Learn**:  
- Passing MongoDB data to EJS.  

---

## **4. Search Users (Query Params + Filtering)**  
**Goal**: Search users via `?q=John` and render results.  
**Code**:  
```javascript
// GET /users?q=John
app.get('/users', async (req, res) => {
  const query = req.query.q ? { name: { $regex: req.query.q, $options: 'i' } } : {};
  const users = await User.find(query);
  res.render('users', { users, searchQuery: req.query.q });
});
```  
**EJS (`users.ejs`)**:
```html
<form action="/users" method="GET">
  <input type="text" name="q" value="<%= searchQuery %>">
</form>
<ul>
  <% users.forEach(user => { %>
    <li><%= user.name %></li>
  <% }) %>
</ul>
```  
**Learn**:  
- Dynamic filtering with MongoDB (`$regex`).  
- Form submission with `method="GET"` (query params).  

---

## **5. Pagination (SSR + Query Params)**  
**Goal**: Render paginated users (`?page=2&limit=5`).  
**Code**:  
```javascript
app.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();
  const totalPages = Math.ceil(total / limit);

  res.render('users', { users, page, totalPages });
});
```  
**EJS (`users.ejs`)**:
```html
<% for (let i = 1; i <= totalPages; i++) { %>
  <a href="/users?page=<%= i %>"><%= i %></a>
<% } %>
```  
**Learn**:  
- Pagination logic (`skip`, `limit`).  
- Dynamic links in EJS.  

---

## **6. Dynamic Forms (Pre-fill Inputs from Query Params)**  
**Goal**: Pre-fill a search form with `?category=books`.  
**EJS (`search.ejs`)**:
```html
<form action="/search" method="GET">
  <input 
    type="text" 
    name="category" 
    value="<%= req.query.category || '' %>"
  >
</form>
```  
**Learn**:  
- Using `req.query` to pre-fill forms.  

---

## **7. Error Handling (404 Page)**  
**Goal**: Render a 404 page if a user isn’t found.  
**Code**:  
```javascript
app.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).render('404');
  res.render('user', { user });
});
```  
**Learn**:  
- SSR error pages.  

---

## **8. Layouts & Partials (DRY EJS)**  
**Goal**: Avoid repeating headers/footers.  
1. Create `views/partials/header.ejs`:  
   ```html
   <header>My Site</header>
   ```  
2. Use it in other templates:  
   ```html
   <%- include('partials/header') %>
   ```  
**Learn**:  
- EJS includes (`<%- include() %>`).  

---

## **9. Authentication (Protected Routes + SSR)**  
**Goal**: Render a dashboard only if logged in.  
**Code**:  
```javascript
app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('dashboard', { user: req.session.user });
});
```  
**Learn**:  
- Session-based auth in SSR.  

---

## **10. Real-World Blog (Full SSR App)**  
**Goal**: Combine everything into a blog with:  
- Homepage (paginated posts).  
- Search (`?q=nodejs`).  
- Post details (`/post/:id`).  
- Comments (form submission).  

**Example Structure**:  
```
views/
  ├── partials/
  │   ├── header.ejs
  │   └── footer.ejs
  ├── home.ejs
  ├── post.ejs
  └── search.ejs
```  

---

### **Bonus (Expert SSR)**  
- **Caching**: Cache rendered pages with Redis.  
- **Dynamic Meta Tags**: Change `<title>` and `<meta>` per page for SEO.  
- **Static File Optimization**: Use `express-static` for CSS/JS.  

---

### **Key Takeaways**  
1. **EJS Syntax**:  
   - `<%= %>` → Output escaped HTML.  
   - `<%- %>` → Output raw HTML (for includes).  
   - `<% %>` → JavaScript logic (loops/conditions).  
2. **SSR Flow**:  
   - **Request** → **Express Route** → **MongoDB Query** → **EJS Render** → **HTML Response**.  
3. **Best Practices**:  
   - Use partials for reusable components.  
   - Validate query params before rendering.  

---

### **Next Steps**  
- Try integrating **React/Vue** with EJS for hybrid rendering.  
- Explore **Next.js** (React SSR framework).  

Let me know if you want a deep dive into any of these! 🚀