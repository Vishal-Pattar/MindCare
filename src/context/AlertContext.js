import React, { createContext, useState, useContext, useCallback } from "react";
import AlertBox from "../components/AlertBox/AlertBox";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((content, variant, component) => {
    const id = Math.random().toString(36).substring(7);
    setAlerts((alerts) => [...alerts, { id, variant, component, content }]);
    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <div className="alertbox__wrapper">
        {alerts.map((alert) => (
          <AlertBox
            key={alert.id}
            id={alert.id}
            variant={alert.variant}
            component={alert.component}
            removeAlert={removeAlert}
          >
            {alert.content}
          </AlertBox>
        ))}
      </div>
    </AlertContext.Provider>
  );
};
