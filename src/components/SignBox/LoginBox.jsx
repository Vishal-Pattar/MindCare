import React, { useState, useContext } from "react";
import "./SignBox.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { addAlert } = useAlert();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,
        { username, password }
      );
      const { token, role } = response.data;

      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("username", username);

      const successMessage =
        role === "Admin" ? "Login Successful!" : "Login Successful!";
      addAlert(successMessage, "success", "signbox");

      const infoMessage =
        role === "Admin"
          ? "Welcome Admin. Redirecting to the Admin Dashboard..."
          : "Welcome to the chat! Redirecting to the Chat...";

      addAlert(infoMessage, "info", "signbox");

      setTimeout(() => {
        login({ username, role });
        if (role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/chat");
        }
      }, 1000);
    } catch (error) {
      setUsername("");
      setPassword("");
      console.error(error.response.data.error);
      addAlert(error.response.data.error, "error", "signbox");
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div className="signerror__container">
      <div className="signbox__container">
        <div className="signbox__title">Please Login to Continue</div>
        <div className="signbox__input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your Username"
            value={username}
            onChange={handleInputChange(setUsername)}
            required
          />
        </div>
        <div className="signbox__input">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            placeholder="Enter your Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
        </div>
        <button className="signbox__button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className="signbox__footer">
        No account yet? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginBox;
