import React, { useState, useEffect } from "react";
import "./SettingsPage.css";
import { triggerFetchCredits } from "../../hooks/useCredits";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const SettingsPage = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "soft-coral-theme"
  );
  const [notifications, setNotifications] = useState(
    () => localStorage.getItem("notifications") || "enabled"
  );

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleNotificationsChange = (event) => {
    setNotifications(event.target.value);
  };

  const handleSaveChanges = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("notifications", notifications);
    window.location.reload();
  };

  useEffect(() => {
    triggerFetchCredits();
  }, []);

  return (
    <div className="settings__container">
      <div className="settings__title">Settings</div>

      <div className="settings__section">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          value={theme}
          onChange={handleThemeChange}
          className="settings__select"
        >
          <option value="theme-developer">Developer</option>
          <option value="theme-lavender">Lavender</option>
          <option value="theme-pastel">Pastel</option>
          <option value="theme-soft-blue">Soft Blue</option>
          <option value="theme-mint-green">Mint Green</option>
          <option value="theme-yellow">Yellow</option>
          <option value="theme-soft-coral">Soft Coral</option>
          <option value="theme-peach">Peach</option>
        </select>
      </div>

      <div className="settings__section">
        <label>Notifications</label>
        <div className="settings__radio-group">
          <label>
            <input
              type="radio"
              value="enabled"
              checked={notifications === "enabled"}
              onChange={handleNotificationsChange}
            />
            Enable Notifications
          </label>
          <label>
            <input
              type="radio"
              value="disabled"
              checked={notifications === "disabled"}
              onChange={handleNotificationsChange}
            />
            Disable Notifications
          </label>
        </div>
      </div>

      <button className="settings__button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(SettingsPage);
