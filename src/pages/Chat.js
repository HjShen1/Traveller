import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, List, ListItem, ListItemText, TextField, Button } from "@mui/material";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000"); // 连接到后端 WebSocket

function Chat() {
    const { id } = useParams(); // 从 URL 中获取房间 ID
    const [messages, setMessages] = useState([]); // 聊天记录
    const [newMessage, setNewMessage] = useState(""); // 新消息内容
    const [sender, setSender] = useState("User1"); // 模拟当前用户（可以替换为登录用户）

    // 加入房间并加载聊天记录
    useEffect(() => {
        // 加入房间
        socket.emit("joinRoom", id);

        // 加载聊天记录
        axios
            .get(`/api/chat/${id}`)
            .then((response) => setMessages(response.data))
            .catch((error) => console.error("Failed to load chat history:", error));

        // 接收实时消息
        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // 清理 WebSocket 连接
        return () => {
            socket.disconnect();
        };
    }, [id]);

    // 发送消息
    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        const messageData = {
            roomId: id,
            sender,
            message: newMessage,
        };

        // 通过 WebSocket 发送消息
        console.log("Sending message:", messageData); // 确认发送内容
        socket.emit("message", messageData);
        setNewMessage(""); // 清空输入框
    };

    return (
        <Container style={{ marginTop: "20px" }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Chat with User {id}
            </Typography>
            {/* 聊天记录 */}
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${msg.sender}: ${msg.message}`}
                            secondary={new Date(msg.createdAt).toLocaleString()}
                        />
                    </ListItem>
                ))}
            </List>
            {/* 输入框和发送按钮 */}
            <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                style={{ marginTop: "20px" }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
                style={{ marginTop: "10px" }}
            >
                Send
            </Button>
        </Container>
    );
}

export default Chat;