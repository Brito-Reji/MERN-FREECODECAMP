import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());

app.listen(5000, () => {
  connectDB();
  console.log("server running on http://localhost:5000");
});
