import React, { useState, useEffect } from "react";
import "./SignBox.css";
import axios from "axios";
import { useAlert } from "../../context/AlertContext";
import { useParams, useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addAlert } = useAlert();
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status === "success") {
          setIsValidToken(true);
        } else {
          addAlert(
            "Invalid or expired token. Please request a new password reset link",
            "info",
            "center"
          );
        }
      } catch (error) {
        console.log(error);
        addAlert("Page not found or token invalid", "error", "center");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, addAlert, navigate]);

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

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/auth/new-password`,
        {
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        addAlert("Password Updated Successfully", "info", "bottom_center");
        navigate("/login"); // Redirect to login or another page after success
      }
    } catch (error) {
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  if (loading) {
    return <></>;
  }

  if (!isValidToken) {
    return <></>;
  }

  return (
    <form className="signbox__container">
      <div className="signbox__title">New Password</div>
      <div className="signbox__input">
        <label htmlFor="newPassword">*New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="newPassword"
          placeholder="Enter your Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="off"
        />
        <div type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "🙈" : "👁️"}
        </div>
      </div>
      <div className="signbox__input">
        <label htmlFor="confirmPassword">*Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Enter your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
        />
      </div>
      <button className="signbox__button" onClick={handleNewPassword}>
        Submit
      </button>
    </form>
  );
};

export default NewPassword;
