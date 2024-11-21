import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chat from "./pages/Chat";
import ItineraryPage from "./pages/ItineraryPage";


//Adding MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // 蓝色
    },
    secondary: {
      main: "#ff4081", // 粉色
    },
  },
});


function App() {

// Adding: test part
// const [testMessage, setTestMessage] = useState(""); // 存储后端的消息

//   // 新加：API 调用逻辑
//   useEffect(() => {
//     fetch("/api/test") // 调用后端 /api/test
//       .then((response) => response.json()) // 将返回的数据解析为 JSON
//       .then((data) => setTestMessage(data.message)) // 保存后端返回的 message 到状态中
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
          <Route path="/chat/:id" element={<Chat />} /> {/* 添加聊天页面路由 */}
          <Route path="/itinerary" element={<ItineraryPage />} /> {/* 添加聊天页面路由 */}
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;