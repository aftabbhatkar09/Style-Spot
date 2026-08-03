import express from "express";

import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getAllUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "#controllers/user.controller.js";
import { admin, protect } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getAllUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
