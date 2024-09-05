import React, { createContext, useState, useContext, useCallback } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((content, variant, position) => {
    setAlerts((alerts) => {
      // Remove any alert with the same content
      const filteredAlerts = alerts.filter(
        (alert) => alert.content !== content
      );

      // Add the new alert
      const id = Math.random().toString(36).substring(7);
      return [...filteredAlerts, { id, variant, content, position }];
    });
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
  }, []);

  const removeAlertByContent = useCallback((content) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.content !== content));
  }, []);

  const removeAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert, removeAllAlerts, removeAlertByContent }}>
      {children}
    </AlertContext.Provider>
  );
};
