const Product = require("../models/product.model.js");

const getProducts = async (req, res) => {
  try {
    //Get all products from MongoDB: {}
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (err) {
    //Throw error message with status code 500
    res.status(500).json({ message: err.message });
  }
};
//View a product by ID
const getProductById = async (req, res) => {
  try {
    //Find product by ID using params
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    //Save data to MongoDB
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) res.status(404).json({ message: err.message });
    // Check if product is updated successfully
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    // Check if product exists
    if (!product) res.status(404).json({ message: err.message });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
