import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import "./Admin.css";
import { Link, Outlet, useLocation } from "react-router-dom";
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

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
              <Link
                to="/admin"
                onClick={toggleSidebar}
              >
                <div className="adminpanel__menu--item">Toggle</div>
              </Link>
              <Link to="/admin/users">
                <div className="adminpanel__menu--item">Users</div>
              </Link>
              <Link to="/admin/coupons">
                <div className="adminpanel__menu--item">Coupons</div>
              </Link>
              <Link to="/admin/sessions">
                <div className="adminpanel__menu--item">Sessions</div>
              </Link>
              <Link to="/admin/email">
                <div className="adminpanel__menu--item">Email</div>
              </Link>
              <Link to="/admin/invitation">
                <div className="adminpanel__menu--item">Invitation</div>
              </Link>
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
              <Link to="/admin/users">
                <FaUser className="adminpanel__menu--button" title="Users" />
              </Link>
              <Link to="/admin/coupons">
                <BiSolidCoupon
                  className="adminpanel__menu--button"
                  title="Coupons"
                />
              </Link>
              <Link to="/admin/sessions">
                <MdEvent
                  className="adminpanel__menu--button"
                  title="Sessions"
                />
              </Link>
              <Link to="/admin/email">
                <MdEmail className="adminpanel__menu--button" title="Email" />
              </Link>
              <Link to="/admin/invitation">
                <MdCoPresent
                  className="adminpanel__menu--button"
                  title="Invitation"
                />
              </Link>
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
