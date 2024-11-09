import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./global.css";
import "./font.css";
import "./theme.css";
import Header from "./components/Header/Header.jsx";
import HomeArea from "./components/HomeArea/HomeArea.jsx";

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
import Invitation from "./components/Admin/Invitation/Invitation.jsx";
import Notification from "./components/Admin/Notification/Notification.jsx";
import ControlProfile from "./components/Admin/Profile/ControlProfile.jsx";

import LandingPage from "./components/LandingPage/LandingPage.jsx";
import { AuthProvider } from "./context/AuthContext.js";
import { AlertProvider } from "./context/AlertContext.js";
import AlertBox from "./components/AlertBox/AlertBox.jsx";
import PasswordInput from "./components/SignBox/PasswordInput.jsx";
import ProfileContainer from "./components/Profile/ProfileContainer.jsx";
import PageNotFound from "./components/Error/PageNotFound.jsx";
import SettingsPage from "./components/Settings/SettingsPage.jsx";

import Tutorials from "./components/Tutorials/Tutorials.jsx";
import BlogList from "./components/Blog/BlogList.jsx";
import BlogDetail from "./components/Blog/BlogDetail.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";

import Pricing from "./components/Pricing/Pricing.jsx";
import Checkout from "./components/Pricing/Checkout.jsx";

const App = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className={`App ${theme}`}>
          <AlertProvider>
            <Header />
            <Routes>
              <Route path="/admin" element={<AdminPanel />}>
                <Route path="users" element={<Users />} />
                <Route path="coupons" element={<Coupon />} />
                <Route path="sessions" element={<Session />} />
                <Route path="profile/:username" element={<Profile />} />
                <Route path="profiles/:username" element={<ControlProfile />} />
                <Route path="history/:sessionId" element={<ChatHistory />} />
                <Route path="email" element={<Email />} />
                <Route path="invitation" element={<Invitation />} />
                <Route path="notification" element={<Notification />} />
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

              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/settings" element={<SettingsPage />} />

              <Route path="/pricing" element={<Pricing />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/faq" element={<FAQ />} />
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
