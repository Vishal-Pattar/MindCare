import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";
import PlanCard from "./PlanCard";
import pricingPlanData from "./pricingPlanData";
import { encodeToBase64Url } from "../../utils/Base64Url.js";
import { useAlert } from "../../context/AlertContext.js";
import axios from "../../api/axios.js";

const Pricing = () => {
  const navigate = useNavigate();
  const { addAlert } = useAlert();
  const [subscribedPlan, setSubscribedPlan] = useState("Free");

  // Fetch user preference for subscribed plan
  const fetchPreference = useCallback(async () => {
    try {
      const { data } = await axios.get("/preference");
      setSubscribedPlan(data?.data?.plan || "Free");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      addAlert(errorMessage, "error", "bottom_right");
    }
  }, [addAlert]);

  useEffect(() => {
    fetchPreference();
  }, [fetchPreference]);

  // Handle plan selection and navigate to checkout
  const handlePlanSelection = (planName, price) => {
    if (planName === "Enterprise") {
      navigate("/checkout");
    } else {
      const encodedPlanData = encodeToBase64Url({ planName, amount: price });
      navigate(`/checkout?data=${encodedPlanData}`);
    }
  };

  const getPlanStatus = (planName) => {
    const planPriority = ["Free", "Pro", "Enterprise"];
    const subscribedIndex = planPriority.indexOf(subscribedPlan);
    const currentPlanIndex = planPriority.indexOf(planName);

    if (currentPlanIndex === subscribedIndex) {
      return "current";
    } else if (currentPlanIndex > subscribedIndex) {
      return "available";
    } else {
      return "included";
    }
  };

  return (
    <div className="pricing__container">
      <div className="pricing__plans">
        {pricingPlanData.map((plan) => {
          const status = getPlanStatus(plan.name);

          return (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              isSubscribed={status === "current"}
              onSelect={
                status === "available"
                  ? () => handlePlanSelection(plan.name, plan.price)
                  : null
              }
              status={status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
