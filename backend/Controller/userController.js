import UserModel from "../Model/UserModel.js";
import bcrypt from "bcryptjs";

// Helper check role
const checkRole = (user, roles = []) => {
  if (!roles.includes(user.role)) {
    const err = new Error("Bạn không có quyền thực hiện hành động này");
    err.statusCode = 403;
    throw err;
  }
};

const userController = {
  // 📌 [GET] /api/users - admin lấy toàn bộ user
  getAll: async (req, res) => {
    try {
      checkRole(req.user, ["admin"]);
      const users = await UserModel.find().select("-password");
      res.status(200).json({ message: "Success", data: users });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  // 📌 [GET] /api/users/:id - admin hoặc chính chủ
  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      if (req.user.role !== "admin" && req.user._id.toString() !== id) {
        return res.status(403).json({ message: "Không có quyền truy cập" });
      }
      const user = await UserModel.findById(id).select("-password");
      if (!user) return res.status(404).json({ message: "User không tồn tại" });
      res.status(200).json({ message: "Success", data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 📌 [POST] /api/users - tạo user (admin hoặc đăng ký public)
  create: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        ...req.body,
        password: hashedPassword,
        role: req.user?.role === "admin" ? role : "user", // admin tạo được mọi role, người ngoài chỉ tạo user
      });

      await newUser.save();
      const result = newUser.toObject();
      delete result.password;

      res.status(201).json({ message: "Tạo user thành công", data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 📌 [PUT] /api/users/:id - update user (admin hoặc chính chủ)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      if (req.user.role !== "admin" && req.user._id.toString() !== id) {
        return res.status(403).json({ message: "Không có quyền chỉnh sửa" });
      }

      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      }).select("-password");

      if (!updatedUser)
        return res.status(404).json({ message: "User không tồn tại" });

      res.status(200).json({ message: "Cập nhật thành công", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 📌 [DELETE] /api/users/:id - chỉ admin
  remove: async (req, res) => {
    try {
      checkRole(req.user, ["admin"]);
      const { id } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(id);
      if (!deletedUser)
        return res.status(404).json({ message: "User không tồn tại" });

      res.status(200).json({ message: "Xóa user thành công" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },
};

export default userController;
