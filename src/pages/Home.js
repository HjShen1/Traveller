import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Traveller!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/matches">
        Find Matches
      </Button>
      <Button variant="contained" color="primary" component={Link} to="/itinerary">
        Create Itinerary
      </Button>
    </Container>
  );
}

export default Home;