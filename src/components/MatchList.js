import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MatchList({ matches }) {

  const navigate = useNavigate(); // Hook，用于页面跳转

  const handleChat = (id) => {
    navigate(`/chat/${id}`); // 跳转到聊天页面
  };

  if (!matches) {
    return (
      <Typography variant="body1" color="textSecondary" style={{ marginTop: "20px" }}>
        Please enter location and interests to find matches.
      </Typography>
    );
  }

  if (matches.length==0){
    return(
      <Typography variant="body1" color="textSecondary" style={{ marginTop: "20px" }}>
      No users found! Try agian lol.
    </Typography>
    );
  }
    return (
      <Grid container spacing={3}>
        {matches.map((match, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{match.email}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Interests: {Array.isArray(match.interests) ? match.interests.join(", ") : "No interests provided"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleChat(match.email)}
                >
                  Chat Now!
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

export default MatchList;