import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "../../../context/AlertContext";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";

const GenerateCoupon = () => {
  const [numberOfCoupons, setNumberOfCoupons] = useState("");
  const [creditsPerCoupon, setCreditsPerCoupon] = useState("");
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const handleGenerate = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/api/v1/coupons`,
        {
          numberOfCoupons: parseInt(numberOfCoupons),
          creditsPerCoupon: parseInt(creditsPerCoupon),
        },
        config
      );
      const newCoupons = response.data.data;
      console.log("newCoupons:", response);

      const sortedCoupons = [...coupons, ...newCoupons].sort((a, b) => {
        if (a.status !== b.status) {
          return a.status - b.status;
        }
        return new Date(a.created_at) - new Date(b.created_at);
      });

      setCouponStats(response.data.count);
      setNumberOfCoupons("");
      setCreditsPerCoupon("");
    } catch (error) {
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  return (
    <div className="admin__cover">
      <input
        type="text"
        className="admin__input admin__input--small"
        placeholder="Number"
        maxLength={2}
        value={numberOfCoupons}
        onChange={(e) => setNumberOfCoupons(e.target.value)}
      />
      <input
        type="text"
        className="admin__input admin__input--small"
        placeholder="Credits"
        maxLength={3}
        value={creditsPerCoupon}
        onChange={(e) => setCreditsPerCoupon(e.target.value)}
      />
      <button className="admin__button" onClick={handleGenerate}>
        Generate
      </button>
    </div>
  );
};

export default withAuthorization(Permissions.Root_Access)(GenerateCoupon);
