import React, { useEffect, useRef } from "react";
import { useAlert } from "../../context/AlertContext";
import {
  MdErrorOutline,
  MdWarningAmber,
  MdInfo,
  MdCheckCircle,
} from "react-icons/md";
import "./AlertBox.css";

const AlertBox = () => {
  const { alerts, removeAlert } = useAlert();
  const timers = useRef({});

  useEffect(() => {
    alerts.forEach((alert) => {
      if (!timers.current[alert.id]) {
        timers.current[alert.id] = setTimeout(() => {
          removeAlert(alert.id);
          delete timers.current[alert.id];
        }, 5000);
      }
    });

    return () => {
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, [alerts, removeAlert]);

  const getIcon = (variant) => {
    switch (variant) {
      case "error":
        return <MdErrorOutline className="alertbox__symbol" />;
      case "warning":
        return <MdWarningAmber className="alertbox__symbol" />;
      case "info":
        return <MdInfo className="alertbox__symbol" />;
      case "success":
        return <MdCheckCircle className="alertbox__symbol" />;
      default:
        return null;
    }
  };

  const getPositionContainer = (position) => {
    const filteredAlerts = alerts.filter((alert) => alert.position === position);
    if (filteredAlerts.length === 0) {
      return null;
    }

    return (
      <div key={position} className={`alert-container ${position}`}>
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`alertbox__container alert__${alert.variant}`}
          >
            {getIcon(alert.variant)}
            {alert.content}
          </div>
        ))}
      </div>
    );
  };

  const positions = [
    "top_left",
    "top_center",
    "top_right",
    "bottom_left",
    "bottom_center",
    "bottom_right",
    "center",
    "left",
    "right",
  ];

  return <>{positions.map((position) => getPositionContainer(position))}</>;
};

export default AlertBox;