import React, { useState } from "react";
import "./SignBox.css";
import axios from "axios";
import { useAlert } from "../../context/AlertContext";
import { useParams } from "react-router-dom";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { addAlert } = useAlert();
  const { token } = useParams();

  const handleNewPassword = async (event) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      addAlert("Please enter your new password", "error", "bottom_center");
      return;
    }

    if (newPassword !== confirmPassword) {
      addAlert("Passwords do not match", "error", "bottom_center");
      return;
    }

    addAlert("Password updated successfully", "info", "bottom_center");

    // try {
    //   const apiUrl = process.env.REACT_APP_API_URL;
    //   const response = await axios.post(`${apiUrl}/api/v1/users/login`,
    //     { username, password }
    //   );
    //   if (response.data.status === "success") {
    //     addAlert("Login Successful!", "info", "bottom_center");
    //   }
    // } catch (error) {
    //   addAlert(
    //     error.response ? error.response.data.message : error.message,
    //     "error",
    //     "bottom_right"
    //   );
    // }
  };

  return (
    <div className="signbox__container">
      <div className="signbox__title">New Password</div>
      <div className="signbox__input">
        <label htmlFor="username">*New Password</label>
        <input
          type={showPassword ? "password" : "text"}
          id="newPassword"
          placeholder="Enter your Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "🙈" : "👁️"}
        </div>
      </div>
      <div className="signbox__input">
        <label htmlFor="username">*Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Enter your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="signbox__button" onClick={handleNewPassword}>
        Submit
      </button>
    </div>
  );
};

export default NewPassword;
