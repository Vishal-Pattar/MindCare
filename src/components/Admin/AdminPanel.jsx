import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import "./Admin.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";
import { triggerFetchCredits } from "../../hooks/useCredits";
import Dashboard from "./Dashboard/Dashboard";
import { ImMenu } from "react-icons/im";
import { FaUser } from "react-icons/fa6";
import { BiSolidCoupon } from "react-icons/bi";
import {
  MdArrowForwardIos,
  MdCoPresent,
  MdEmail,
  MdEvent,
  MdArrowBackIosNew,
} from "react-icons/md";
import { AiOutlineSolution } from "react-icons/ai";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    triggerFetchCredits();
  }, []);

  return (
    <div className="adminpanel">
      <div
        className={`adminpanel__sidebar ${
          isSidebarOpen
            ? "adminpanel__sidebar--open"
            : "adminpanel__sidebar--closed"
        }`}
      >
        {isSidebarOpen ? (
          <div className="adminpanel__sidebar--content">
            <div className="adminpanel__sidebar--content-btn">
              <div className="adminpanel__menu--item" onClick={toggleSidebar}>
                Toggle
              </div>
              <div
                className="adminpanel__menu--item"
                onClick={() => handleNavigation("/admin/users")}
              >
                Users
              </div>
              <div
                className="adminpanel__menu--item"
                onClick={() => handleNavigation("/admin/coupons")}
              >
                Coupons
              </div>
              <div
                className="adminpanel__menu--item"
                onClick={() => handleNavigation("/admin/sessions")}
              >
                Sessions
              </div>
              <div
                className="adminpanel__menu--item"
                onClick={() => handleNavigation("/admin/email")}
              >
                Email
              </div>
              <div
                className="adminpanel__menu--item"
                onClick={() => handleNavigation("/admin/invitation")}
              >
                Invitation
              </div>
              <div
                className="adminpanel__menu--item"
                onClick={() => handleNavigation("/admin/issues")}
              >
                Issues
              </div>
            </div>
            <div className="adminpanel__sidebar--toggle">
              <MdArrowBackIosNew
                className="adminpanel__sidebar--toggle-icon"
                onClick={toggleSidebar}
              />
            </div>
          </div>
        ) : (
          <div className="adminpanel__menu--content">
            <div className="adminpanel__menu--content-btn">
              <ImMenu
                className="adminpanel__menu--button"
                onClick={toggleSidebar}
              />
              <FaUser
                className="adminpanel__menu--button"
                title="Users"
                onClick={() => handleNavigation("/admin/users")}
              />
              <BiSolidCoupon
                className="adminpanel__menu--button"
                title="Coupons"
                onClick={() => handleNavigation("/admin/coupons")}
              />
              <MdEvent
                className="adminpanel__menu--button"
                title="Sessions"
                onClick={() => handleNavigation("/admin/sessions")}
              />
              <MdEmail
                className="adminpanel__menu--button"
                title="Email"
                onClick={() => handleNavigation("/admin/email")}
              />
              <MdCoPresent
                className="adminpanel__menu--button"
                title="Invitation"
                onClick={() => handleNavigation("/admin/invitation")}
              />
              <AiOutlineSolution
                className="adminpanel__menu--button"
                title="Issue"
                onClick={() => handleNavigation("/admin/issues")}
              />
            </div>
            <div className="adminpanel__sidebar--toggle">
              <MdArrowForwardIos
                className="adminpanel__sidebar--toggle-icon"
                onClick={toggleSidebar}
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={`adminpanel__container ${
          isSidebarOpen
            ? "adminpanel__container--open"
            : "adminpanel__container--closed"
        }`}
      >
        {location.pathname === "/admin" ? <Dashboard /> : <Outlet />}
      </div>
    </div>
  );
};

export default withAuthorization(Permissions.Admin_Access)(AdminPanel);
