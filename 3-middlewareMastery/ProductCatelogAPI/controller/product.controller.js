import productModel from "../models/product.model.js";

export const getAllProducts = async (req,res) => {
        try {
        const products = await productModel.find(); // Fetch all documents
        res.status(200).json(products);
        } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
        }
}

export const getProductsById = async (req,res) => {
    try {
        const {id} = req.params;
        const selectedProduct = await productModel.findById(id);
        res.status(200).json(selectedProduct)
    } catch (error) {
        res.status(500).json({
        error : "Unable to get product by Id."
        })
    }    
}

export const createProduct = async(req,res)=>{
    try {
        const {
            name,
            description,
            price,category,
            inStock,
            quantity
        } = req.body;

        const newProduct  = await productModel.create({
            name,
            description,
            price,category,
            inStock,
            quantity
        }) 

        res.status(201).json({
            msg : "new Product created succesfully",newProduct
        })

    } catch (error) {
        res.status(500).json({error : "Unable to create new Product."})
    }
}

export const updateProductById = async(req,res) => {
    try {
        const {id} = req.params;
        const {
            name,
            description,
            price,category,
            inStock,
            quantity
        } = req.body
        const updatedProduct= await productModel.findByIdAndUpdate(id,
            { 
            name,
            description,
            price,category,
            inStock,
            quantity
            }
            ,{new: true ,runValidators : true});
        res.json({msg: "Update succesfull",updatedProduct});  

    } catch (error) {
        res.status(500).json({ error: "Error updating task" });
    }
}

export const deleteProductById = async (req, res) => {
    try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
    }
};