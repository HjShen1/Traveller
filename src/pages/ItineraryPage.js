import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";

function ItineraryPage() {
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [itinerary, setItinerary] = useState(null);

    const handleGenerate = async () => {
        try {
            console.log('Yes!');
            const response = await axios.post("http://localhost:3000/api/itinerary/generate", {
                destination,
                days: parseInt(days),
                budget: parseInt(budget),
            });
            setItinerary(response.data); // 保存生成行程
        } catch (error) {
            console.error("Error generating itinerary:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create Your Itinerary
            </Typography>
            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Destination"
                        fullWidth
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Days"
                        fullWidth
                        type="number"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Budget"
                        fullWidth
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleGenerate}>
                Create Itinerary
            </Button>

            {itinerary && (
                <div style={{ marginTop: "30px" }}>
                    <Typography variant="h5" gutterBottom>
                        Itinerary for {itinerary.destination}
                    </Typography>
                    <Grid container spacing={3}>
                        {itinerary.activities.map((activity, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Day {activity.day}</Typography>
                                        <Typography variant="body1">{activity.activity}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Location: {activity.location}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Transport: {activity.transport}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Cost: ${activity.cost}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </Container>
    );
}

export default ItineraryPage;