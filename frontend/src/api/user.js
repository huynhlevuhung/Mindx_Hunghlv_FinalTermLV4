// src/api/user.js
import axiosClient from "./axiosClient";

const userApi = {
  // Lấy tất cả user (chỉ admin mới được)
  getAll: () => axiosClient.get("/api/users"),

  // Lấy chi tiết 1 user theo id
  getById: (id) => axiosClient.get(`/api/users/${id}`),

  // Tạo user mới (đăng ký hoặc admin thêm)
  create: (data) => axiosClient.post("/api/users", data),

  // Cập nhật user (id, data mới) -> cần quyền hoặc chính chủ
  update: (id, data) => axiosClient.put(`/api/users/${id}`, data),

  // Xóa user theo id -> chỉ admin
  delete: (id) => axiosClient.delete(`/api/users/${id}`),

  // Login trả về token
  login: (data) => axiosClient.post("/api/users/login", data),

  // Register (tạo tài khoản user mới)
  register: (data) => axiosClient.post("/api/users/register", data),
};

export default userApi;
