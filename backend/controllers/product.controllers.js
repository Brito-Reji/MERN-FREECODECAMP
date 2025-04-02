import mongoose from "mongoose";
import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ data: products, sucess: true });
  } catch (error) {
    console.log("there id an error while feching products", error);
  }
};

const createProduct = async (req, res) => {
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
};

const updateProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
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
};

export { createProduct, deleteProduct, updateProduct, getProducts };
