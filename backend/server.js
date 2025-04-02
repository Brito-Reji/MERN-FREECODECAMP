import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.router.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/products", ProductRoutes);
app.listen(5000, () => {
  connectDB();
  console.log("server running on http://localhost:5000");
});
