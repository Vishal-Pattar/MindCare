import React, { useState, useEffect } from "react";
import "./SignBox.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios.js";
import { useAlert } from "../../context/AlertContext";
import decodeFromBase64Url from "../../utils/decodeFromBase64Url";

const RegisterBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [isCouponDisabled, setIsCouponDisabled] = useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);

  const navigate = useNavigate();
  const { addAlert } = useAlert();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      try {
        const decodedData = decodeFromBase64Url(token);

        if (decodedData.email) {
          setEmail(decodedData.email);
          setIsEmailDisabled(true);
        }
        if (decodedData.coupon) {
          setCoupon(decodedData.coupon);
          setIsCouponDisabled(true);
        }
      } catch (error) {
        addAlert(
          "Invalid token provided. Unable to decode.",
          "error",
          "bottom_right"
        );
      }
    }
  }, [location.search, addAlert]);

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        username,
        password,
        email,
        couponCode: coupon,
      });
      if (response.status === 201) {
        addAlert("Registration Successful", "success", "bottom_right");
        addAlert("Redirecting to Login Page", "info", "bottom_right");
        navigate("/login");
      }
    } catch (error) {
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
            autoComplete="off"
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
            autoComplete="off"
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
            disabled={isEmailDisabled}
            className={isEmailDisabled ? "disabled-input" : ""}
            required={true}
            autoComplete="off"
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
            disabled={isCouponDisabled}
            className={isCouponDisabled ? "disabled-input" : ""}
            required={true}
            autoComplete="off"
          />
        </div>
        <button className="signbox__button" onClick={handleRegister}>
          Create Account
        </button>
      </form>
      <div className="signbox__footer">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  );
};

export default RegisterBox;
