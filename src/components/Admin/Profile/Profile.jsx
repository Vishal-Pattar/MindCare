import React, { useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";
import "./AdminProfile.css";

const Profile = () => {
  const { username } = useParams();
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    pincode: "",
    country: "",
    state: "",
    district: "",
    block: "",
    context: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.put(
        `${apiUrl}/api/v1/admin/personal/${username}`,
        { formData },
        config
      );
      addAlert("Profile updated successfully", "success", "bottom_right");
      setIsEditing(false);
    } catch (error) {
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const fetchData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(
        `${apiUrl}/api/v1/admin/personal/${username}`,
        config
      );
      const data = response.data.data;
      if (data) {
        const {
          username,
          first_name,
          last_name,
          age,
          gender,
          pincode,
          address,
          context,
        } = data;
        const fetchedData = {
          username,
          first_name,
          last_name,
          age,
          gender,
          pincode,
          country: address.country,
          state: address.state,
          district: address.district,
          block: address.block,
          context,
        };
        setFormData(fetchedData);
      }
    } catch (error) {
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleEdit = () => {
    if (isEditing) {
      fetchData();
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="adminprofile__block">
      <form onSubmit={handleSubmit}>
        <div className="adminprofile__span">
          <div className="adminprofile__header">
            <div className="adminprofile__title">Personal Information</div>
            <div className="adminprofile__description">
              Review and update your personal details
            </div>
          </div>
        </div>
        <div className="adminprofile__span">
          <div className="adminprofile__container">
            <span className="adminprofile__group">
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">Username</div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">First Name</div>
                <input
                  type="text"
                  id="firstname"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">Last Name</div>
                <input
                  type="text"
                  id="lastname"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </span>
            <span className="adminprofile__group">
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">Age</div>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">Gender</div>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="adminprofile__input">
                <div className="adminprofile__input--label">Pincode</div>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter your pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </span>
            <span className="adminprofile__group">
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">Country</div>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">State</div>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </span>
            <span className="adminprofile__group">
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">District</div>
                <input
                  type="text"
                  id="district"
                  name="district"
                  placeholder="Enter your district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="adminprofile__input">
                <div className="adminprofile__input--label">Block</div>
                <input
                  type="text"
                  id="block"
                  name="block"
                  placeholder="Enter your block"
                  value={formData.block}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </span>
          </div>
          <div className="adminprofile__container">
            <div className="adminprofile__input">
              <div className="adminprofile__input--label">Context</div>
              <textarea
                name="context"
                value={formData.context}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
        <div className="adminprofile__span">
          <button
            type="button"
            className="adminprofile__button"
            onClick={handleToggleEdit} // Toggle edit mode and fetch if cancel
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button type="submit" className="adminprofile__button">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default withAuthorization(Permissions.Admin_Access)(Profile);
