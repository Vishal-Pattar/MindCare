import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useAlert } from "../../context/AlertContext";
import axios from "axios";
import { triggerFetchCredits } from "../../hooks/useCredits";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";
import DisplayProfile from "./DisplayProfile";
import EditProfile from "./EditProfile";
import BuildProfile from "./BuildProfile";

const ProfileContainer = () => {
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [profileExists, setProfileExists] = useState(false);
  const [editing, setEditing] = useState(false);

  // Fetch profile existence
  useEffect(() => {
    const checkProfileExists = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/v1/personal/exist`,
          config
        );
        setProfileExists(response.data.data ? true : false);
      } catch (error) {
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    checkProfileExists();
    triggerFetchCredits();
  }, []);

  return (
    <div className="profile__window">
      {profileExists ? (
        editing ? (
          <EditProfile setEditing={setEditing} />
        ) : (
          <DisplayProfile setEditing={setEditing} />
        )
      ) : (
        <BuildProfile setProfileExists={setProfileExists} />
      )}
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(ProfileContainer);
