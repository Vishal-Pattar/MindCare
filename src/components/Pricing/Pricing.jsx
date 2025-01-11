import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";
import PlanCard from "./PlanCard";
import pricingPlanData from "./pricingPlanData";
import { encodeToBase64Url } from "../../utils/Base64Url.js";

const Pricing = () => {
  const navigate = useNavigate();
  const subscribedPlans = "Enterprise";

  const handlePlanSelection = (planName, price) => {
    const planData = { planName, amount: price };
    const encodedPlanData = encodeToBase64Url(planData);
    navigate(`/checkout?data=${encodedPlanData}`);
  };

  return (
    <div className="pricing__container">
      <div className="pricing__plans">
        {pricingPlanData.map((plan) => (
          <PlanCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            isSubscribed={subscribedPlans === plan.name}
            onSelect={() => handlePlanSelection(plan.name, plan.price)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
