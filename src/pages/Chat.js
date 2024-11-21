import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, List, ListItem, ListItemText, TextField, Button } from "@mui/material";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000"); // link to backend WebSocket

function Chat() {
    const { id } = useParams(); // get room ID from URL
    const [messages, setMessages] = useState([]); // chat records
    const [newMessage, setNewMessage] = useState(""); // new message
    const [sender, setSender] = useState("User1"); // Simulating current user (can be replaced with logged-in user)

    // Join room and load chat history
    useEffect(() => {
        // Join the room
        socket.emit("joinRoom", id);

        // Load chat history
        axios
            .get(`/api/chat/${id}`)
            .then((response) => setMessages(response.data))
            .catch((error) => console.error("Failed to load chat history:", error));

        // Receive real-time messages
        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up WebSocket connection
        return () => {
            socket.disconnect();
        };
    }, [id]);

    // Send message
    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        const messageData = {
            roomId: id,
            sender,
            message: newMessage,
        };

        // Send message via WebSocket
        console.log("Sending message:", messageData); // Confirm the content being sent
        socket.emit("message", messageData);
        setNewMessage(""); // Clear input field
    };

    return (
        <Container style={{ marginTop: "20px" }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Chat with User {id}
            </Typography>
            {/* Chat records */}
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
            {/* Input field and send button */}
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