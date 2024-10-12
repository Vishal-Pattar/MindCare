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
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/users/login`, {
        username,
        password,
      });
      if (response.data.status === "success") {
        const { token, role, session } = response.data;
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("session", session);

        addAlert("Login Successful!", "success", "bottom_right");

        login({ username, role });
        if (role === "Admin" || role === "Root") {
          navigate("/admin");
        } else {
          navigate("/chat");
        }
      }
    } catch (error) {
      setUsername("");
      setPassword("");
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  return (
    <>
      <form className="signbox__container">
        <div className="signbox__title">Please Login to Continue</div>
        <div className="signbox__input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="signbox__input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>
        <button className="signbox__button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div className="signbox__footer">
        <Link to="/register">Forgot Password?</Link>
      </div>
    </>
  );
};

export default LoginBox;
