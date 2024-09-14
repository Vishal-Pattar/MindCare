import React, { useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";

const Profile = () => {
  const { username } = useParams();
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [userFound, setUserFound] = useState(false);
  const [formData, setFormData] = useState({
    username: username,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFetchAddress = async () => {
    const { pincode } = formData;
    if (!pincode) {
      addAlert("Pincode is required.", "error", "signbox");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];

      if (data.Status === "Success" && data.PostOffice?.length > 0) {
        const { Country, State, District, Block } = data.PostOffice[0];
        setFormData((prevData) => ({
          ...prevData,
          country: Country,
          state: State,
          district: District,
          block: Block,
        }));
        addAlert(
          "Address data fetched successfully.",
          "success",
          "bottom_right"
        );
      } else {
        addAlert(
          "No data found for the given pincode.",
          "error",
          "bottom_right"
        );
      }
    } catch (error) {
      addAlert(
        error.response.data.message || error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      first_name,
      last_name,
      age,
      gender,
      pincode,
      country,
      state,
      district,
      block,
      context,
    } = formData;

    if (
      !username ||
      !first_name ||
      !last_name ||
      !age ||
      !gender ||
      !pincode ||
      !country ||
      !state ||
      !district ||
      !block ||
      !context
    ) {
      addAlert("All fields are required.", "error", "bottom_right");
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.put(
        `${apiUrl}/api/v1/personal`,
        { formData },
        config
      );

      addAlert(response.data.message, "success", "bottom_right");
    } catch (error) {
      addAlert(
        error.response.data.error || error.message,
        "error",
        "bottom_right"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/v1/personal/?username=${username}`,
          config
        );

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
          setUserFound(true);
        }
      } catch (error) {
        setUserFound(false);
        addAlert(
          error.response.data.message || error.message,
          "error",
          "bottom_right"
        );
      }
    };

    fetchData();
  }, [username, authToken, addAlert]);

  return userFound ? (
    <>
      <div className="admin__box admin__box--profile">
        <form onSubmit={handleSubmit}>
          <div className="admin__form--container-box">
            <div className="admin__form--container">
              <span className="admin__form--group">
                <div className="admin__form--input disabled">
                  <label htmlFor="username">*Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </span>
              <span className="admin__form--group">
                <div className="admin__form--input">
                  <label htmlFor="first_name">*First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Enter your first name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin__form--input">
                  <label htmlFor="last_name">*Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </span>
              <span className="admin__form--group">
                <div className="admin__form--input">
                  <label htmlFor="age">*Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your Age"
                    min="1"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin__form--select ">
                  <label htmlFor="gender">*Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="admin__form--select--gender"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </span>
            </div>
            <div className="admin__form--container">
              <span className="admin__form--group admin__form--group-address">
                <div className="admin__form--input">
                  <label htmlFor="pincode">*Pincode</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Enter your pincode"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="admin__form--button"
                  onClick={handleFetchAddress}
                >
                  Fetch
                </button>
              </span>
              <span className="admin__form--group">
                <div className="admin__form--input">
                  <label htmlFor="country">*Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Enter your country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin__form--input">
                  <label htmlFor="state">*State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </span>
              <span className="admin__form--group">
                <div className="admin__form--input">
                  <label htmlFor="district">*District</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    placeholder="Enter your district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin__form--input">
                  <label htmlFor="block">*Block</label>
                  <input
                    type="text"
                    id="block"
                    name="block"
                    placeholder="Enter your block"
                    value={formData.block}
                    onChange={handleChange}
                  />
                </div>
              </span>
            </div>
            <div className="admin__form--container">
              <div className="admin__form--input">
                <label htmlFor="context">*Context</label>
                <textarea
                  id="context"
                  name="context"
                  placeholder="Enter your context"
                  value={formData.context}
                  onChange={handleChange}
                />
              </div>
              <span className="admin__form--btn-grp">
                <button type="submit" className="admin__form--button">
                  Update
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  ) : null;
};

export default withAuthorization(Permissions.Admin_Access)(Profile);
