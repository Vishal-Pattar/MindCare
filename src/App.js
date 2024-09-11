import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./global.css";
import "./font.css";
import "./theme.css";
import Header from "./components/Header/Header";
import HomeArea from "./components/HomeArea/HomeArea";

import Login from "./components/SignBox/Login.jsx";
import Register from "./components/SignBox/Register.jsx";
import ResetPassword from "./components/SignBox/ResetPassword.jsx";
import NewPassword from "./components/SignBox/NewPassword.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";
import ReportIssue from "./components/Feedback/ReportIssue.jsx";

import AdminPanel from "./components/Admin/AdminPanel.jsx";
import Users from "./components/Admin/Users/Users.jsx";
import Coupon from "./components/Admin/Coupon/Coupon.jsx";
import Profile from "./components/Admin/Profile/Profile.jsx";
import Session from "./components/Admin/Session/Session.jsx";
import ChatHistory from "./components/Admin/ChatHistory/ChatHistory.jsx";
import Email from "./components/Admin/Email/Email.jsx";

import LandingPage from "./components/LandingPage/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import AlertBox from "./components/AlertBox/AlertBox";
import PasswordInput from "./components/SignBox/PasswordInput.jsx";
import UserProfile from "./components/Profile/Profile.jsx";
import DisplayProfile from "./components/Profile/DisplayProfile.jsx";
import PageNotFound from "./components/Error/PageNotFound.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App soft-coral-theme">
          <AlertProvider>
            <Header />
            <Routes>
              <Route path="/admin" element={<AdminPanel />}>
                <Route path="users" element={<Users />} />
                <Route path="coupons" element={<Coupon />} />
                <Route path="sessions" element={<Session />} />
                <Route path="profile/:username" element={<Profile />} />
                <Route path="history/:sessionId" element={<ChatHistory />} />
                <Route path="email" element={<Email />} />
              </Route>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<HomeArea />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/newPassword/:token" element={<NewPassword />} />
              <Route path="/try" element={<PasswordInput />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/reportIssue" element={<ReportIssue />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profileDisplay" element={<DisplayProfile />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <AlertBox />
          </AlertProvider>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
