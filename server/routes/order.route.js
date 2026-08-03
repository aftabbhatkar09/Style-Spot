import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "#controllers/order.controller.js";

import { admin, protect } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/my-orders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/payment").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
