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
      const response = await axios.post("/api/v1/users/login",
        { username, password }
      );
      if (response.data.status === "success") {
        const { token, role } = response.data;
        sessionStorage.setItem("authToken", token);

        login({
          username: username,
          role: role,
        });

        addAlert("Login Successful!", "success", "bottom_right");

        setTimeout(() => {
          login({ username, role });
          if (role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/chat");
          }
        }, 1000);
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
      <div className="signbox__container">
        <div className="signbox__title">Please Login to Continue</div>
        <div className="signbox__input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </div>
        <button className="signbox__button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className="signbox__footer">
        <Link to="/register">Forgot Password?</Link>
      </div>
    </>
  );
};

export default LoginBox;
