import React, { useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import axios from "axios";

const DisplayProfile = () => {
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  // Initialize state to hold form data and editing state
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
      await axios.put(`${apiUrl}/api/v1/personal`, { formData }, config);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/v1/personal`, config);
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
          setFormData({
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
          });
        }
      } catch (error) {
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile__block">
      <div className="profile__span">
        <span className="profile__header">
          <div className="profile__title">Personal Information</div>
          <div className="profile__description">
            Review and update your personal details
          </div>
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="profile__span">
          <div className="profile__container profile__container--big">
            <span className="profile__group">
              <div className="profile__input">
                <div className="profile__input--label">Username</div>
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
              <div className="profile__input">
                <div className="profile__input--label">First Name</div>
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
              <div className="profile__input">
                <div className="profile__input--label">Last Name</div>
                <input
                  type="text"
                  id="lastname"
                  name="last_name" // Fixed name attribute to match state
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
            </span>
            <span className="profile__group">
              <div className="profile__input">
                <div className="profile__input--label">Age</div>
                <input
                  type="number"
                  id="age"
                  name="age" // Fixed name attribute to match state
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
              <div className="profile__input">
                <div className="profile__input--label">Gender</div>
                <input
                  type="text"
                  id="gender"
                  name="gender" // Fixed name attribute to match state
                  placeholder="Enter your gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
              <div className="profile__input">
                <div className="profile__input--label">Pincode</div>
                <input
                  type="text"
                  id="pincode"
                  name="pincode" // Fixed name attribute to match state
                  placeholder="Enter your pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
            </span>
            <span className="profile__group">
              <div className="profile__input">
                <div className="profile__input--label">Country</div>
                <input
                  type="text"
                  id="country"
                  name="country" // Fixed name attribute to match state
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
              <div className="profile__input">
                <div className="profile__input--label">State</div>
                <input
                  type="text"
                  id="state"
                  name="state" // Fixed name attribute to match state
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
            </span>
            <span className="profile__group">
              <div className="profile__input">
                <div className="profile__input--label">District</div>
                <input
                  type="text"
                  id="district"
                  name="district" // Fixed name attribute to match state
                  placeholder="Enter your district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
              <div className="profile__input">
                <div className="profile__input--label">Block</div>
                <input
                  type="text"
                  id="block"
                  name="block" // Fixed name attribute to match state
                  placeholder="Enter your block"
                  value={formData.block}
                  onChange={handleChange}
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
            </span>
          </div>
          <div className="profile__container profile__container--big">
            <div className="profile__input">
              <div className="profile__input--label">Context</div>
              <textarea
                name="context" // Fixed name attribute to match state
                value={formData.context}
                onChange={handleChange}
                disabled={!isEditing} // Disable input if not editing
              />
            </div>
          </div>
        </div>
        <div className="profile__span">
          <button
            type="button"
            className="profile__button"
            onClick={() => setIsEditing(!isEditing)} // Toggle editing mode
          >
            {isEditing ? "Cancel" : "Edit"} {/* Toggle button text */}
          </button>
          {isEditing && (
            <button type="submit" className="profile__button">
              Save
            </button> // Show save button only when editing
          )}
        </div>
      </form>
    </div>
  );
};

export default DisplayProfile;
