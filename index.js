// setup express server and connect to MongoDB
const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const productRoutes = require("./routes/product.route.js");
const userRoutes = require("./routes/auth.route.js");
const cookieParser = require("cookie-parser");

connectDB();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
// Middleware
// Allow express to use JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parse cookies associated with the client request objects
app.use(cookieParser());
//Route
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  //Response message from browser to check connection
  res.send("Hello from Node API Server");
});
