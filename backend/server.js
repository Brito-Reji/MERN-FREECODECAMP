import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.router.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use("/api/products", ProductRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log("server running on http://localhost:" + PORT);
});
