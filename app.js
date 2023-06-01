const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FoodRoutes = require("./src/routes/food");
const OrderRoutes = require("./src/routes/order")

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/foods", FoodRoutes);
app.use("/orders", OrderRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log("Failed to conect to mongo", err);
  }
};

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running in ${process.env.PORT}`);
    connectDB();
});

module.exports = {app, server}