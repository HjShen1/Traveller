const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat"); // 假设有一个 Chat 模型

// 获取聊天记录
router.get("/:roomId", async (req, res) => {
    try {
        const { roomId } = req.params;
        const messages = await Chat.find({ roomId }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to load chat history" });
    }
});

module.exports = router;