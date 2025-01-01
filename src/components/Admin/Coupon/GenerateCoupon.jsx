import React, { useState } from "react";
import axios from "../../../api/axios.js";
import { useAlert } from "../../../context/AlertContext";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";

const GenerateCoupon = () => {
  const [numberOfCoupons, setNumberOfCoupons] = useState("");
  const [creditsPerCoupon, setCreditsPerCoupon] = useState("");
  const { addAlert } = useAlert();

  const handleGenerate = async () => {
    try {
      const response = await axios.post("/coupons", {
        numberOfCoupons: parseInt(numberOfCoupons),
        creditsPerCoupon: parseInt(creditsPerCoupon),
      });
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
