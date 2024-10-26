const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://hoanganhphan2k:abcd1234@backenddb.ueiuh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

module.exports = connectDB;
