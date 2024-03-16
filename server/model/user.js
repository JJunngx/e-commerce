const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  phone: Number,
  cart: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  role: {
    type: String,
    enum: ["Customer", "Consultant", "Admin"],
    default: "Customer",
  },
});
module.exports = mongoose.model("User", userSchema);
