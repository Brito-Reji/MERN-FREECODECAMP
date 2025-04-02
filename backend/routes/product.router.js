import Product from "../models/product.model";
import express from "express";
const router = express.Router();
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ data: products, sucess: true });
  } catch (error) {
    console.log("there id an error while feching products", error);
  }
});
router.post("/api/products", async (req, res) => {
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

router.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "no id found", sucess: false });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    4;
    res.status(200).json({ success: true, message: updatedProduct });
  } catch (error) {
    res.status(404).json({ success: false, message: "server error" });
  }
});

router.delete("/api/products/:id", async (req, res) => {
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
