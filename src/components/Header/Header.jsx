import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import useCredits from "../../hooks/useCredits";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { clearMessages } from "../../slices/messagesSlice";

const Header = () => {
  const credits = useCredits();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, ussr } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const token = useMemo(() => sessionStorage.getItem("authToken"), [location]);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const handleLogout = async () => {
    handleMenu();
    dispatch(clearMessages());
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        sessionStorage.removeItem("authToken");
        logout();
        setIsAuthenticated(false);
        navigate("/feedback");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="header__container">
        <Link to="/">
          <div className="header__title roboto-regular">Creative Minds</div>
        </Link>
        <span>
          {(ussr?.role === "Admin" || ussr?.role === "Root") && (
            <Link to="/admin">
              <button className="header__button roboto-regular">Admin</button>
            </Link>
          )}
          {isAuthenticated && (
            <>
              <div className="header__stats roboto-regular">
                Credits:{" "}
                <span className={credits > 0 ? "greenColor" : "redColor"}>
                  {credits}
                </span>
              </div>
              <div className="header__notification roboto-regular">
                Notifications
              </div>
              <span className="header__notify">0</span>
            </>
          )}
          <div className="header__menu--button" onClick={handleMenu}>
            {isMenuOpen ? (
              <HiOutlineMenuAlt3 className="header__menu--icon" />
            ) : (
              <HiOutlineMenu className="header__menu--icon" />
            )}
          </div>
        </span>
      </div>
      {isMenuOpen && (
        <div className="header__menu">
          {isAuthenticated && (
            <>
              <Link to="/chat">
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleMenu}
                >
                  Chat
                </button>
              </Link>
              <Link to="/profile">
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleMenu}
                >
                  Profile
                </button>
              </Link>
              <Link to="/settings">
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleMenu}
                >
                  Settings
                </button>
              </Link>
              <Link to="/reportIssue">
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleMenu}
                >
                  Report Issue
                </button>
              </Link>
              <Link>
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login">
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleMenu}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleMenu}
                >
                  Register
                </button>
              </Link>
              <Link to="/resetPassword">
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleMenu}
                >
                  Reset Password
                </button>
              </Link>
              <Link to="/reportIssue">
                <button
                  className="header__menu--item roboto-regular"
                  onClick={handleMenu}
                >
                  Report Issue
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
