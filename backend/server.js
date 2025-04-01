import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();
const app = express();
app.use(express.json());
app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!(product.name || product.price || product.image)) {
    res.status(400).json({
      success: false,
      message: "please provide all fields",
    });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("server running on http://localhost:5000");
});
