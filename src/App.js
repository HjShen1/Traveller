import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chat from "./pages/Chat";
import ItineraryPage from "./pages/ItineraryPage";

// Adding MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#ff4081", // Pink
    },
  },
});

function App() {

// Adding: test part
// const [testMessage, setTestMessage] = useState(""); // Store messages from the backend

//   // Adding: API call logic
//   useEffect(() => {
//     fetch("/api/test") // Call backend /api/test
//       .then((response) => response.json()) // Parse the response to JSON
//       .then((data) => setTestMessage(data.message)) // Save the returned message to the state
//       .catch((error) => console.error("Error fetching API:", error));
//   }, []);

  //

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <div>
          {/* <h1>Frontend to Backend Connection Test</h1> */}
          {/* <p>{testMessage ? testMessage : "Loading..."}</p> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat/:id" element={<Chat />} /> {/* Add chat page route */}
            <Route path="/itinerary" element={<ItineraryPage />} /> {/* Add itinerary page route */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;