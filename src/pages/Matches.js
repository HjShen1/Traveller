import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MatchList from "../components/MatchList";
import axios from "axios";
import { TextField, Button, Typography, Container, Grid, Divider } from "@mui/material";

const socket = io("http://localhost:3000"); // Connect to the WebSocket server with backend address

function Matches() {
  //--------------const area---------------
  // For Find Buddy
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState("");

  // For WebSocket Chat
  const [chatUser, setChatUser] = useState(null);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  //====API: WebSocket==========================================================
  // Listen for messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Join a room
  const handleJoinRoom = () => {
    if (room) {
      socket.emit("joinRoom", room);
      console.log(`Joined room: ${room}`);
    }
  };

  // Send a message
  const handleSendMessage = () => {
    if (room && message) {
      const sender = "User1"; // Example sender
      socket.emit("sendMessage", { room, message, sender });
      setMessage("");
    }
  };

  //====API: Get Matches==========================================================
  // Find Buddy Logic
  const handleMatch = () => {
    if (!location || !interests) {
      setError("You need to complete the locations AND interests!");
      return;
    }

    console.log("Location:", location);
    console.log("Interests:", interests);

    setError("");
    axios
      .get("http://localhost:3000/api/match/recommendations", {
        params: {
          interests: interests,
          coordinates: location,
        },
      })
      .then((response) => setMatches(response.data))
      .catch((error) => {
        console.error("Error finding matches:", error);
        setError("Failed to fetch matches. Please try again");
      });
  };

  //===================return=================================================
  return (
    <Container>
      <Typography variant="h4" color="primary" gutterBottom>
        Find Your Travel Buddies
      </Typography>

      {/* Form */}
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location (longitude,latitude)"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Interests (comma-separated)"
            variant="outlined"
            fullWidth
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleMatch}>
        Find Matches
      </Button>

      {/* Error Message */}
      {error && (
        <Typography variant="body1" color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}

      {/* Match Results */}
      <div style={{ marginTop: "20px" }}>
        <MatchList matches={matches} />
      </div>

      {/* Divider */}
      <Divider style={{ margin: "40px 0" }} />

      <Typography variant="h4" color="primary" gutterBottom>
        Real-Time Chat
      </Typography>

      {/* Join Room */}
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Room Name"
            variant="outlined"
            fullWidth
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" fullWidth onClick={handleJoinRoom}>
            Join Room
          </Button>
        </Grid>
      </Grid>

      {/* Message Input */}
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="secondary" onClick={handleSendMessage}>
        Send Message
      </Button>

      {/* Chat Records */}
      <div style={{ marginTop: "20px", maxHeight: "300px", overflowY: "auto" }}>
        {chat.map((c, index) => (
          <Typography key={index} variant="body1" style={{ marginBottom: "10px" }}>
            <strong>{c.sender}:</strong> {c.message}
          </Typography>
        ))}
      </div>
    </Container>
  );
}

export default Matches;