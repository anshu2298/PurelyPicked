import express from "express";
import {
  addProduct,
  productById,
  changeStock,
  productList,
} from "../controllers/productsController.js";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/authSeller.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(["images"]), authSeller, addProduct);
productRouter.post("/stock", authSeller, changeStock);
productRouter.get("/list", productList);
productRouter.get("/id", productById);

export default productRouter;
