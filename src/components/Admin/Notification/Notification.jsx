import React, { useState, useEffect } from "react";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";
import { useAlert } from "../../../context/AlertContext";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/v1/notification`,
          config
        );
        console.log(response.data.data);
        setNotifications(response.data.data);

      } catch (error) {
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    fetchNotifications();
  }, [authToken, addAlert]);

  return (
    <>
      <div className="admin__container">
        <span className="admin__title">Notifications</span>
        <div className="admin__cover">
          <div className="admin__stat">
            You have {notifications.length} notifications
          </div>
        </div>
      </div>
      <div className="admin__box admin__box--notification">
        {notifications.map((notification, index) => (
          <div key={index} className="admin__notification">
            <span className="admin__notification--header">
              <div className="admin__notification--title">
                {notification.title}
              </div>
              <div className="admin__notification--time">
                {new Date(notification.date).toLocaleString()}{" "}
                {/* Format date */}
              </div>
            </span>
            <div className="admin__notification--description">
              {notification.message}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default withAuthorization(Permissions.Admin_Access)(Notification);
