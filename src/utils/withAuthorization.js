import React, { useContext, useEffect, useState } from "react";
import axios from "../api/axios.js";
import { rolePermissions } from "./roles";
import AuthContext from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const withAuthorization = (requiredPermission) => (WrappedComponent) => {
  return (props) => {
    const { ussr, login } = useContext(AuthContext);
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState(true);
    const authToken = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          if (!ussr) {
            const response = await axios.get("/admin/role");
            login({
              username: response.data.username,
              role: response.data.role,
            });
          }
        } catch (err) {
          addAlert("Failed to fetch user role.", "error", "bottom_right");
          navigate("/login"); // Navigate to login page on error
        } finally {
          setLoading(false);
        }
      };

      if (!authToken) {
        addAlert(
          "Access Denied: You must be logged in to access this page.",
          "error",
          "center"
        );
        setLoading(false);
        navigate("/login"); // Navigate to login page if auth token is missing
      } else {
        fetchUserRole();
      }
    }, [ussr, authToken, login, addAlert, navigate]);

    if (loading) {
      return null; // Or a loading spinner can be returned here
    }

    if (
      !authToken ||
      (ussr && !rolePermissions[ussr.role]?.includes(requiredPermission))
    ) {
      addAlert(
        "Access Denied: You do not have the necessary permissions to access this page.",
        "error",
        "center"
      );
      navigate("/login"); // Navigate to login if the user doesn't have permission
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;
