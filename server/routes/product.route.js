import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
} from "#controllers/product.controller.js";
import { protect, admin } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get(`/:id`, getProductById);

export default router;
