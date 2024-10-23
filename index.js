const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoutes = require("./routes/product.route.js");
//connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://hoanganhphan2k:abcd1234@backenddb.ueiuh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Middleware
// Allow express to use JSON data
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
//Route
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  //Response message from browser
  res.send("Hello from Node API Server");
});
