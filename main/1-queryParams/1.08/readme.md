

### **8. Full-Text Search with ?q=**

* **Goal**: Implement search using MongoDB’s text index.

* **Setup**:

  ```js
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

* **Learn**:

  * MongoDB text indexes and `$text` queries.

---

Let me know if you want to add filters, pagination, or relevance-based sorting.
