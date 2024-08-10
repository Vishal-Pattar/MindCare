import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import useMessages from "../../hooks/useMessages";
import AuthContext from "../../context/AuthContext";
import useCredits from "../../hooks/useCredits";

const Header = () => {
  const [messages, addMessage, clearMessages] = useMessages();
  const credits = useCredits();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, ussr } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = useMemo(() => sessionStorage.getItem("authToken"), [location]);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/v1/users/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("username");
        clearMessages();
        logout();
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isOnAdminPath = matchPath("/admin/*", location.pathname);

  return (
    <div className="header__container">
      <div className="header__title roboto-regular">
        Creative Minds AI Chat {ussr?.role}
      </div>
      <span>
        {ussr?.role === "Admin" && (
          <Link to="/admin">
            <button className="header__button roboto-regular">Admin</button>
          </Link>
        )}
        {location.pathname === "/login" && (
          <Link to="/register">
            <button className="header__button roboto-regular">Register</button>
          </Link>
        )}
        {location.pathname === "/register" && (
          <Link to="/login">
            <button className="header__button roboto-regular">Login</button>
          </Link>
        )}
        {(location.pathname === "/chat" || isOnAdminPath) &&
          (isAuthenticated ? (
            <span>
              <div className="header__stats roboto-regular">
                Credits: <span className={credits > 0 ? "greenColor" : "redColor" }>{credits}</span>
              </div>
              <button
                className="header__button roboto-regular"
                onClick={handleLogout}
              >
                Logout
              </button>
            </span>
          ) : (
            <Link to="/login">
              <button className="header__button roboto-regular">Login</button>
            </Link>
          ))}
      </span>
    </div>
  );
};

export default Header;
