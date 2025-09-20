import jwt from "jsonwebtoken";
import UserModel from "../Model/UserModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Không có token, truy cập bị từ chối" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Xác thực thất bại", error: error.message });
  }
};
