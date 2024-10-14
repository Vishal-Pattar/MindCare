import React, { useState } from "react";
import "./Pricing.css";

const Pricing = () => {
  const [plan, setPlan] = useState("monthly");

  const handlePlanToggle = (e) => {
    setPlan(e.target.value);
  };

  return (
    <div className="pricing__container">
      <div className="pricing__header">
        <h1 className="pricing__title">Pricing</h1>
        <div className="pricing__toggle">
          <label>
            <input
              type="radio"
              value="monthly"
              checked={plan === "monthly"}
              onChange={handlePlanToggle}
            />
            Monthly
          </label>
          <label>
            <input
              type="radio"
              value="pay-as-you-go"
              checked={plan === "pay-as-you-go"}
              onChange={handlePlanToggle}
            />
            Pay as you go
          </label>
        </div>
      </div>

      <div className="pricing__plans">
        <div className="pricing__card pricing__card--free">
          <h2 className="pricing__plan-title">Free</h2>
          <p className="pricing__plan-price">₹0</p>
          <ul className="pricing__features">
            <li>50 credits monthly</li>
            <li>Delay in messages</li>
            <li>Email Support</li>
            <li>Free Resources</li>
          </ul>
          <button className="pricing__btn">Get Free Plan</button>
        </div>

        <div className="pricing__card pricing__card--pro">
          <h2 className="pricing__plan-title">Pro</h2>
          <p className="pricing__plan-price">₹500/month</p>
          <ul className="pricing__features">
            <li>500 credits monthly</li>
            <li>Prompt service</li>
            <li>Priority Support</li>
            <li>All features in Free</li>
          </ul>
          <button className="pricing__btn">Get Pro Plan</button>
        </div>

        <div className="pricing__card pricing__card--custom">
          <h2 className="pricing__plan-title">Custom</h2>
          <p className="pricing__plan-price">Pay as you go</p>
          <ul className="pricing__features">
            <li>All features in Pro</li>
            <li>Pay as per your usage</li>
          </ul>
          <button className="pricing__btn">Get Custom Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
