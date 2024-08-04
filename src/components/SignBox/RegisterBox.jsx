import React, { useState } from "react";
import "./SignBox.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertBox from "../AlertBox/AlertBox";

const RegisterBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !password || !email || !coupon) {
      addMessage("All fields are required", "error");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/register`,
        { username, password, email, couponCode: coupon }
      );
      if (response.status === 201) {
        addMessage("Registration Successful", "success");
        addMessage("Redirecting to Login Page", "info");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        addMessage(error.response.data.msg, "error");
      } else {
        addMessage("Server error", "error");
      }
    }
  };

  const addMessage = (message, variant) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), message, variant },
    ]);
  };

  const removeMessage = (id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="signerror__container">
      <div className="signbox__container">
        <div className="signbox__title">Sign up for an account!</div>
        <div className="signbox__input">
          <label htmlFor="username">*Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
        </div>
        <div className="signbox__input">
          <label htmlFor="pass">*Password</label>
          <input
            type="password"
            id="pass"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
        </div>
        <div className="signbox__input">
          <label htmlFor="email">*Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </div>
        <div className="signbox__input">
          <label htmlFor="coupon">
            *Coupon <span>[Enter your coupon code to avail credits]</span>
          </label>
          <input
            type="text"
            id="coupon"
            placeholder="Enter your Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            required={true}
          />
        </div>
        <button className="signbox__button" onClick={handleRegister}>
          Create Account
        </button>
      </div>
      <div className="signbox__footer">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
      <div className="signbox__wrapper">
        {messages.map((msg) => (
          <AlertBox
            key={msg.id}
            id={msg.id}
            removeAlert={removeMessage}
            variant={msg.variant}
            component="signbox"
          >
            {msg.message}
          </AlertBox>
        ))}
      </div>
    </div>
  );
};

export default RegisterBox;
