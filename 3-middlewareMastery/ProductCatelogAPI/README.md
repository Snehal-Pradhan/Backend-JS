# 🛍️ Product Catalog API

A RESTful API for managing a product catalog built with **Node.js**, **Express**, and **Mongoose**. It enables users to browse and manage products with powerful **filtering**, **sorting**, **pagination**, and **text-based search**, simulating a real-world e-commerce experience.

---

## ✨ Features

### 📦 Product Management (CRUD)
- **Create**: Add new product listings.
- **Retrieve**: Fetch all products or a single product by ID.
- **Update**: Modify existing product details.
- **Delete**: Remove products from the catalog.

### 🧠 Advanced Product Listing
- **Filtering**: Filter by category, price range (`$gte`, `$lte`), inStock status.
- **Sorting**: Sort by fields like `price`, `name`, or `createdAt`.
- **Pagination**: Browse with `page` and `limit` parameters.
- **Text Search**: Full-text search on `name` and `description`.
- **Field Selection**: Use `select` to retrieve specific fields.

---

## 🛠 Technologies Used
- **Node.js**
- **Express.js**
- **Mongoose**
- **MongoDB**
- **dotenv**

---

## 🚀 Getting Started

### ✅ Prerequisites
- **Node.js** (v14+): [Download here](https://nodejs.org/)
- **MongoDB**: Either local or [MongoDB Atlas](https://www.mongodb.com/atlas)

### 📦 Installation

```bash
git clone <repository-url>
cd product-catalog-api
npm install
```

### ⚙️ Environment Setup
Create a .env file in the root:

env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/productcatalogdb
PORT=3000

### 📡 API Endpoints
All routes are prefixed with /api/v1/products.

🔍 GET /api/v1/products
Retrieve all products with query capabilities.

Query Parameters:

- category: Filter by category (e.g., Electronics)

- price[gte]: Price ≥

- price[lte]: Price ≤

- inStock: true / false

- sort: Field to sort by (e.g., -price, name)

- page: Page number

- limit: Results per page

- select: Return specific fields (comma-separated)

- search: Text search on name and description

### ➕ POST /api/v1/products
Create a new product.

- Request Body Example:

```json
{
  "name": "Wireless Headphones",
  "description": "High-quality, noise-cancelling headphones.",
  "price": 199.99,
  "category": "Electronics",
  "inStock": true,
  "quantity": 100
}

```

