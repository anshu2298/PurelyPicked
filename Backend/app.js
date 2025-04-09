import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

//  Configs Imports

import connectCloudinary from "./configs/cloudinary.js";
import connectDB from "./configs/db.js";

//  Router Imports

import userRouter from "./routes/userRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { stripeWebhook } from "./controllers/orderController.js";

dotenv.config();
const url = process.env.DB_URI;
const app = express();
const port = process.env.PORT || 4000;

// Allow multiple origins
const allowedOridins = ["http://localhost:5173"];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);

// Middleware Config

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOridins,
    credentials: true,
  })
);

// ROUTES

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const start = async () => {
  try {
    await connectDB(url).then(() => {
      console.log("Connected to DB....");
    });
    await connectCloudinary();
    app.listen(
      port,
      console.log(`Server is running on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();
