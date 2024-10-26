const mongoose = require("mongoose");
const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema, model } = mongoose;

// create user schema
const userSchema = new Schema(
  {
    // use uuid to generate id automatically
    _id: { type: String, default: v4 },
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Please select your role",
      },
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
//check whether the password is modified and then hashes the password
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});
// compare password provided by user during login with hashed password
userSchema.methods.comparePassword = async function (enterPassword) {
  return bcrypt.compareSync(enterPassword, this.password);
};
// generate jwt token for user authentication
userSchema.methods.jwtToken = function () {
  const user = this;
  return jwt.sign({ id: user._id }, "random string", {
    expiresIn: "1h",
  });
};

const User = model("User", userSchema);

module.exports = User;
