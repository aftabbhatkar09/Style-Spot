import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "#controllers/product.controller.js";
import { protect, admin } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
