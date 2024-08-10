import React, { useContext, useEffect } from "react";
import axios from "axios";
import { rolePermissions } from "./roles";
import AuthContext from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

const withAuthorization = (requiredPermission) => (WrappedComponent) => {
  return (props) => {
    const { ussr, login } = useContext(AuthContext);
    const { addAlert } = useAlert();
    const authToken = sessionStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    useEffect(() => {
      if (!authToken) {
        addAlert(
          "Access Denied: You must be logged in to access this page.",
          "error",
          "center"
        );
        return;
      }

      const fetchUserRole = async () => {
        try {
          const response = await axios.get("/api/v1/admin/role", config);
          login({
            username: response.data.username,
            role: response.data.role,
          });
        } catch (err) {
          addAlert("Failed to fetch user role.", "error", "bottom_right");
        }
      };

      if (!ussr) {
        fetchUserRole();
      }
    }, [ussr, authToken, login, addAlert]);

    if (!authToken) {
      return null;
    }

    if (ussr && !rolePermissions[ussr.role]?.includes(requiredPermission)) {
      addAlert(
        "Access Denied: You do not have the necessary permissions to access this page.",
        "error",
        "center"
      );
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;
