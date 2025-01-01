import React, { useState } from "react";
import "./SignBox.css";
import axios from "../../api/axios.js";
import { useAlert } from "../../context/AlertContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { addAlert } = useAlert();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!email) {
      addAlert("Please enter your email", "error", "bottom_right");
      return;
    }

    try {
      const response = await axios.post("/auth/reset-password", {
        email,
      });
      if (response.data.status === "success") {
        addAlert(
          "Reset Password link sent to your registered email address",
          "info",
          "bottom_right"
        );
      }
    } catch (error) {
      setEmail("");
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  return (
    <form className="signbox__container">
      <div className="signbox__title">Reset Password</div>
      <div className="signbox__input">
        <label htmlFor="username">*Email</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
      </div>
      <button className="signbox__button" onClick={handleResetPassword}>
        Continue
      </button>
    </form>
  );
};

export default ResetPassword;
