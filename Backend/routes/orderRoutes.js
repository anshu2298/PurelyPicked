import express from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderSTRIPE,
} from "../controllers/orderController.js";
import authUser from "../middleware/authMiddleware.js";
import authSeller from "../middleware/authSeller.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderSTRIPE);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);

export default orderRouter;
