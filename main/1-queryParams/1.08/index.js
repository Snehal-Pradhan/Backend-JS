import express from 'express';
import { productValidationSchema } from './product.validator.js';
import { Product } from './product.model.js';
import { queryValidationSchema } from './product.validator.js';
import { createValidator } from 'express-joi-validation';

const app = express();
const validator = createValidator();    

app.use(express.json());


app.get(
  "/products",
  validator.query(queryValidationSchema),
  async (req, res) => {
    const { q, page, limit } = req.query;
    const skip = (page - 1) * limit;

    const filter = q ? { $text: { $search: q } } : {};
    const projection = q ? { score: { $meta: "textScore" } } : {};

    let query = Product.find(filter, projection)
      .skip(skip)
      .limit(limit);

    if (q) {
      query = query.sort({ score: { $meta: "textScore" } });
    }

    const products = await query;
    res.json(products);
  }
);


app.post('/products',validator.body(productValidationSchema),async (req, res) => {
    const prod = await Product.create(req.body);
    res.status(201).json(prod);
    }
);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});