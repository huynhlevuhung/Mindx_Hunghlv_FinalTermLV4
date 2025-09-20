import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Tên đăng nhập không được trống"],
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email không được trống"],
      lowercase: true,
      validate: [validator.isEmail, "Sai định dạng Email"],
    },

    password: {
      type: String,
      required: [true, "Mật khẩu không được trống"],
      minlength: [8, "Mật khẩu phải có ít nhất 8 ký tự"],
      match: [
        /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/,
        "Mật khẩu phải chứa ít nhất 1 chữ số và 1 ký tự đặc biệt",
      ],
      select: false,
    },

    phone: { type: String },

    address: { type: String },

    role: {
      type: String,
      enum: ["user", "seller", "shipper", "admin", "route manager"],
      default: "user",
    },

    isActive: { type: Boolean, default: true },

    avatar: { type: String },

    balanced: { type: Number, default: 0 },

    ranking: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum"],
      default: "bronze",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
