const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app); // 创建 HTTP 服务器
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001", // 前端地址
        methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // 解析 JSON 数据
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// // Routes
// app.get("/", (req, res) => {
//     res.send("WELL DONE Cheryl! Welcome to Traveller Backend!");
// });

// WebSocket Logic
const Chat=require("./models/Chat")

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a room
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Listen for messages
    socket.on("message", async({ roomId, sender, message }) => {
      console.log(`Message received from ${sender} in room ${roomId}: ${message}`); // 检查是否收到消息  
      const newMessage = { roomId, sender, message, createdAt: new Date() };
        console.log(`Message from ${sender} in ${roomId}: ${message}`);
        try {
          // 保存消息到数据库
          await Chat.create(newMessage);

          // 广播消息到房间
          io.to(roomId).emit("message", newMessage);
      } catch (error) {
          console.error("Failed to save message:", error);
      }
        // Emit message to the room
        io.to(roomId).emit("receiveMessage", newMessage);
    });

    // Listen for disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

// All API Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const matchRoutes = require("./routes/match");
app.use("/api/match", matchRoutes);

const chatRoutes = require("./routes/chat");
app.use("/api/chat", chatRoutes);

app.get("/api/test", (req, res) => {
    console.log("API /api/test called");
    res.json({ message: "Hello from backend! 测试成功" });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});