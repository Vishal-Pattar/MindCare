import React, { useState, useEffect } from "react";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";
import { useAlert } from "../../../context/AlertContext";
import axios from "../../../api/axios.js";
import timeAgo from "../../../utils/timeAgo";
import Checkbox from "../Issues/Checkbox";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { addAlert } = useAlert();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/notification");
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
  }, [addAlert]);

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
