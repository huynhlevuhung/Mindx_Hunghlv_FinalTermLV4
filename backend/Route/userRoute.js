import express from "express";
import userController from "../Controller/userController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Admin: lấy toàn bộ user
router.get("/", protect, userController.getAll);

// Admin hoặc chính chủ
router.get("/:id", protect, userController.getOne);

// Tạo user (admin hoặc public)
router.post("/", protect, userController.create);

// Update (admin hoặc chính chủ)
router.put("/:id", protect, userController.update);

// Xóa (admin)
router.delete("/:id", protect, userController.remove);

export default router;
