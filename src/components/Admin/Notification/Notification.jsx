import React, { useState, useEffect } from "react";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";
import { useAlert } from "../../../context/AlertContext";
import axios from "axios";
import timeAgo from "../../../utils/timeAgo";
import Checkbox from "./Checkbox";

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
            <div className="admin__notification--checkbox">
              <Checkbox name={index} />
            </div>
            <div className="admin__notification--content">
              <div className="admin__notification--header">
                <div className="admin__notification--title">
                  {notification.title}
                </div>
                <div className="admin__notification--time">
                  {timeAgo(notification.date)}
                </div>
              </div>
              <div className="admin__notification--description">
                {notification.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default withAuthorization(Permissions.Admin_Access)(Notification);
