import React, { useState } from "react";
import "./SignBox.css";
import axios from "axios";
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
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/users/resetPassword/${email}`);
      if (response.data.status === "success") {
        addAlert("Reset Password link sent to your registered email address", "info", "bottom_right");
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
    <div className="signbox__container">
      <div className="signbox__title">Reset Password</div>
      <div className="signbox__input">
        <label htmlFor="username">*Email</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="signbox__button" onClick={handleResetPassword}>
        Continue
      </button>
    </div>
  );
};

export default ResetPassword;
