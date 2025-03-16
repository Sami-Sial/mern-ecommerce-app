// Importing Modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const axios = require("axios");
const User = require("./models/user.model");

// Data Parsing
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importing Routes
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// Coonecting to Mongo DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to Mongo DB");
  } catch (error) {
    console.log("Mongo DB Connection Failed... " + error.message);
  }
};
connectDB();

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some Error Ocurred" } = err;
  res.status(statusCode).json({
    success: false,
    message: message,
  });
  console.log(err.stack);
});

// Listening to Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is Listening on Port " + PORT);
});

// const fnx = async () => {
//   await User.deleteMany();

//   const result = await fetch("https://dummyjson.com/users");
//   const abc = await result.json();
//   let data = abc.users;

//   data.forEach((user, i) => {
//     user.avatar = { url: user.image, public_id: "dummy id" };
//     user.name = user.username;
//     user.role = "user";

//     const anotherFnx = async () => {
//       const bcrypt = require("bcryptjs");
//       user.password = await bcrypt.hash(user.password, 10);
//     };
//     anotherFnx();
//   });
//     const users = await User.insertMany(data);
//     console.log(users);

// };

// fnx();
