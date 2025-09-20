import express from "express";
import User from "../models/User.js"; // model mongoose

const router = express.Router();

// API lấy tổng số user
router.get("/count", async (req, res) => {
  try {
    const count = await User.countDocuments(); 
    res.json({ totalUsers: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
