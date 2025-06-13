import express from "express";
import { getAllProducts,getProductsById,createProduct,deleteProductById,updateProductById } from "../controller/product.controller.js";

const router = express.Router();

router.get("/",getAllProducts);
router.get("/:id",getProductsById);
router.post("/",createProduct);
router.patch("/:id",updateProductById);
router.delete("/:id",deleteProductById);

export default router ;