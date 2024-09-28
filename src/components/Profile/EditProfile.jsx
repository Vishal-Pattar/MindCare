import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useAlert } from "../../context/AlertContext";
import axios from "axios";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const EditProfile = ({ setEditing }) => {
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [formData, setFormData] = useState({
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

  const [container, setContainer] = useState(1);

  // Fetch profile details when the component is mounted
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/v1/personal`, config);
        const data = response.data.data;

        if (data) {
          const {
            first_name,
            last_name,
            age,
            gender,
            pincode,
            address,
            context,
          } = data;

          // Set the form with the fetched data
          setFormData({
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

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Send PUT request on form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      age,
      gender,
      pincode,
      country,
      state,
      district,
      block,
    } = formData;

    // Check if all fields are filled
    if (
      !first_name ||
      !last_name ||
      !age ||
      !gender ||
      !pincode ||
      !country ||
      !state ||
      !district ||
      !block
    ) {
      addAlert("All fields are required.", "error", "bottom_right");
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      // Make a PUT request to update the profile
      const response = await axios.put(
        `${apiUrl}/api/v1/personal`,
        { formData },
        config
      );
      addAlert(response.data.message, "success", "bottom_right");
      setEditing(false); // Go back to display mode after updating
    } catch (error) {
      console.log(error);
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const handleFetchAddress = async () => {
    const { pincode } = formData;
    if (!pincode) {
      addAlert("Pincode is required.", "error", "bottom_right");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];
      console.log(data);
      if (data.Status === "Success" && data.PostOffice?.length > 0) {
        const { Country, State, District, Block } = data.PostOffice[0];
        setFormData((prevData) => ({
          ...prevData,
          country: Country,
          state: State,
          district: District,
          block: Block,
        }));
        addAlert("Data fetched successfully.", "info", "bottom_right");
      } else {
        addAlert(
          "No data found for the given pincode.",
          "error",
          "bottom_right"
        );
      }
    } catch (error) {
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const handleNextContainer = () => {
    setTimeout(() => {
      setContainer(container + 1);
    }, 500);
  };

  const handlePrevContainer = () => {
    setTimeout(() => {
      setContainer(container - 1);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit}>
      {container === 1 && (
        <div className="profile__container">
          <span className="profile__header">
            <div>
              <span style={{ fontSize: "1.75rem" }}>{container}</span>/2
            </div>
            <div className="profile__title">Edit Your Profile</div>
            <div className="profile__description">
              Update your profile details
            </div>
          </span>

          <span className="profile__group">
            <div className="profile__input">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="profile__input">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </span>

          <span className="profile__group">
            <div className="profile__input">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="profile__input">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </span>
          <span className="profile__button--group flex-end">
            <button
              type="button"
              className="profile__button"
              onClick={handleNextContainer}
            >
              Next
            </button>
          </span>
        </div>
      )}
      {container === 2 && (
        <div className="profile__container">
          <span className="profile__header">
            <div>
              <span style={{ fontSize: "1.75rem" }}>{container}</span>/2
            </div>
            <div className="profile__title">Edit Your Profile</div>
            <div className="profile__description">
              Update your profile details
            </div>
          </span>
          <span className="profile__group">
            <div className="profile__input profile__input--pincode">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                maxLength="6"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="profile__button profile__button--fetch"
              onClick={handleFetchAddress}
            >
              Fetch
            </button>
          </span>

          <span className="profile__group">
            <div className="profile__input">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="profile__input">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </span>

          <span className="profile__group">
            <div className="profile__input">
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="profile__input">
              <label htmlFor="block">Block</label>
              <input
                type="text"
                id="block"
                name="block"
                value={formData.block}
                onChange={handleChange}
              />
            </div>
          </span>
          <span className="profile__button--group">
            <button
              type="button"
              className="profile__button"
              onClick={handlePrevContainer}
            >
              Back
            </button>
            <button type="submit" className="profile__button">
              Update
            </button>
          </span>
        </div>
      )}
    </form>
  );
};

export default withAuthorization(Permissions.User_Access)(EditProfile);
