import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();
const app = express();
app.use(express.json());
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ data: products, sucess: true });
  } catch (error) {
    console.log(error);
  }
});
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

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "delted",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: "product not found",
      success: false,
    });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("server running on http://localhost:5000");
});
