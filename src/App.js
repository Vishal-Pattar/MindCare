import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./global.css";
import "./font.css";
import Header from "./components/Header/Header";
import LoginBox from "./components/SignBox/LoginBox";
import RegisterBox from "./components/SignBox/RegisterBox";
import HomeArea from "./components/HomeArea/HomeArea";
import AdminPanel from "./components/Admin/AdminPanel";
import Users from "./components/Admin/Users/Users";
import Coupon from "./components/Admin/Coupon/Coupon";
import Profile from "./components/Admin/Profile/Profile";
import Session from "./components/Admin/Session/Session";
import ChatHistory from "./components/Admin/ChatHistory/ChatHistory";
import LandingPage from "./components/LandingPage/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import AlertBox from "./components/AlertBox/AlertBox";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AlertProvider>
            <Header />
            <Routes>
              <Route path="/admin" element={<AdminPanel />}>
                <Route path="users" element={<Users />} />
                <Route path="coupons" element={<Coupon />} />
                <Route path="sessions" element={<Session />} />
                <Route path="profile/:username" element={<Profile />} />
                <Route path="history/:sessionId" element={<ChatHistory />} />
              </Route>
              <Route path="/login" element={<LoginBox />} />
              <Route path="/register" element={<RegisterBox />} />
              <Route path="/chat" element={<HomeArea />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
            <AlertBox />
          </AlertProvider>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
