const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        roomId: { type: String, required: true },
        sender: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);