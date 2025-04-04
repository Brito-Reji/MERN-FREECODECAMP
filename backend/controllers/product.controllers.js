import mongoose from "mongoose";
import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ data: products, sucess: true });
  } catch (error) {
    console.log("there id an error while feching products", error);
  }
};

const createProduct = async (req, res) => {
  const product = req.body;
  if (!(product.name || product.price || product.image)) {
    return res.status(400).json({
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
    return res.status(404).json({ message: "no id found", sucess: false });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(404).json({ success: false, message: "server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "not id found", sucess: false });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "deleted",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};

export { createProduct, deleteProduct, updateProduct, getProducts };
