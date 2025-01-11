import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import axios from "../../api/axios.js";
import AuthContext from "../../context/AuthContext";
import useCredits from "../../hooks/useCredits";
import { triggerFetchCredits } from "../../hooks/useCredits";
import { HiOutlineMenuAlt3, HiOutlineMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { clearMessages } from "../../slices/messagesSlice";
import { RiCopperCoinFill } from "react-icons/ri";

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
    if (token) {
      triggerFetchCredits();
    }
  }, [token]);

  const handleLogout = async () => {
    toggleMenu();
    dispatch(clearMessages());
    try {
      const response = await axios.get("/auth/logout");
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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const renderMenuItems = () => {
    if (isAuthenticated) {
      return (
        <>
          <MenuItem to="/chat" label="Chat" onClick={toggleMenu} />
          <MenuItem to="/profile" label="Profile" onClick={toggleMenu} />
          <MenuItem to="/pricing" label="Pricing" onClick={toggleMenu} />
          <MenuItem to="/settings" label="Settings" onClick={toggleMenu} />
          <MenuItem
            to="/reportIssue"
            label="Report Issue"
            onClick={toggleMenu}
          />
          <MenuItem label="Logout" onClick={handleLogout} />
        </>
      );
    }

    return (
      <>
        <MenuItem to="/login" label="Login" onClick={toggleMenu} />
        <MenuItem to="/register" label="Register" onClick={toggleMenu} />
        <MenuItem
          to="/resetPassword"
          label="Reset Password"
          onClick={toggleMenu}
        />
        <MenuItem to="/reportIssue" label="Report Issue" onClick={toggleMenu} />
      </>
    );
  };

  return (
    <>
      <div className="header__container">
        <Link to="/">
          <div className="header__title roboto-regular">Mind Care</div>
        </Link>
        <span>
          {(ussr?.role === "Admin" || ussr?.role === "Root") && (
            <Link to="/admin">
              <button className="header__button roboto-regular">
                Dashboard
              </button>
            </Link>
          )}
          {isAuthenticated && (
            <>
              <div
                className="header__stats roboto-regular"
                onClick={() => navigate("/wallet")}
              >
                Credits:
                <span className={credits > 0 ? "greenColor" : "redColor"}>
                  {credits}
                </span>
                <RiCopperCoinFill className="header__coin--icon" />
              </div>
              <div className="header__notification roboto-regular">
                Notifications
              </div>
              <span className="header__notify">0</span>
            </>
          )}
          <div className="header__menu--button" onClick={toggleMenu}>
            {isMenuOpen ? (
              <HiOutlineMenuAlt3 className="header__menu--icon" />
            ) : (
              <HiOutlineMenu className="header__menu--icon" />
            )}
          </div>
        </span>
      </div>
      {isMenuOpen && <div className="header__menu">{renderMenuItems()}</div>}
    </>
  );
};

const MenuItem = ({ to, label, onClick }) => {
  if (to) {
    return (
      <Link to={to}>
        <button className="header__menu--item roboto-regular" onClick={onClick}>
          {label}
        </button>
      </Link>
    );
  }
  return (
    <button className="header__menu--item roboto-regular" onClick={onClick}>
      {label}
    </button>
  );
};

export default Header;
