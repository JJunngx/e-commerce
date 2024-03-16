const mongoose = require("mongoose");
const { Schema } = mongoose;
// Định nghĩa Schema cho Đơn hàng
const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Tham chiếu đến người dùng
    products: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        name: String,
        image: String,
        price: Number,
      },
    ],

    totalAmount: { type: String, required: true }, // Tổng số tiền của đơn hàng
    address: { type: String, required: true }, // Địa chỉ giao hàng
    status: {
      type: String,
      enum: ["waiting for pay", "paid"],
      default: "waiting for pay",
    },
    delivery: {
      type: String,
      enum: ["waiting for processing", "shipping", "delivered"],
      default: "waiting for processing",
    },
    phone: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  }
  // { timestamps: true }
);

// Tạo mô hình (model) cho Đơn hàng
module.exports = mongoose.model("Order", orderSchema);
// createdAt: { type: Date, default: Date.now }
