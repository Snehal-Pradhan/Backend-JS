import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/producttest");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  }
});


export const Product = mongoose.model("Product", productSchema);
