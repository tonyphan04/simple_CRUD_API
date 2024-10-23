const mongoose = require("mongoose");
// create schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    description: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
