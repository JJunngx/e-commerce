const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  roomChat: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Message", messageSchema);
