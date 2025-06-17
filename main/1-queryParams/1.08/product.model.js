import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/mydatabase");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
},{
  autoIndex: true  
}); 

productSchema.index(
  { name: 'text', description: 'text' },
  { background: false }
);

export const Product = mongoose.model("Product", productSchema);


Product.on('index', err => {
  if (err) console.error("Product indexing error:", err);
  else console.log("✅ Product text index created successfully");
});

await Product.init(); 