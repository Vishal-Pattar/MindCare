import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";

const Pricing = () => {
  const navigate = useNavigate();

  const handlePlanSelection = (planName, price) => {
    navigate(`/checkout?plan=${planName}&amount=${price}`);
  };

  return (
    <div className="pricing__container">
      <div className="pricing__plans">
        {/* Free Plan */}
        <div className="pricing__card pricing__card--free">
          <div className="pricing__plan-title">Free</div>
          <div className="pricing__plan-price">₹0/month</div>
          <div className="pricing__features">
            <div className="pricing__feature">50 credits monthly</div>
            <div className="pricing__feature">Delay in messages</div>
            <div className="pricing__feature">Email Support (24-48 hours)</div>
            <div className="pricing__feature">Free Resources</div>
            <div className="pricing__feature">Access to Community Forum</div>
          </div>
          <button
            className="pricing__btn"
            onClick={() => handlePlanSelection("Free", 0)}
          >
            Get Free Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="pricing__card pricing__card--pro">
          <div className="pricing__plan-title">Pro</div>
          <div className="pricing__plan-price">
            ₹5000/month <br />
          </div>
          <div className="pricing__features">
            <div className="pricing__feature">500 credits monthly</div>
            <div className="pricing__feature">All features in Free Plan</div>
            <div className="pricing__feature">Prompt service</div>
            <div className="pricing__feature">
              Priority Email Support (12-24 hours)
            </div>
            <div className="pricing__feature">Theme customization</div>
            <div className="pricing__feature">Early Access to New Features</div>
            <div className="pricing__feature">Basic Usage Reports</div>
          </div>
          <button
            className="pricing__btn"
            onClick={() => handlePlanSelection("Pro", 500000)}
          >
            Get Pro Plan
          </button>
        </div>

        {/* Custom Plan */}
        <div className="pricing__card pricing__card--custom">
          <div className="pricing__plan-title">Custom</div>
          <div className="pricing__plan-price">Pay as you go</div>
          <div className="pricing__features">
            <div className="pricing__feature">All features in Pro Plan</div>
            <div className="pricing__feature">Pay as per your usage</div>
            <div className="pricing__feature">24/7 Dedicated Support</div>
            <div className="pricing__feature">
              Advanced Customization Options
            </div>
            <div className="pricing__feature">Advanced Usage Reports</div>
            <div className="pricing__feature">
              Custom Integrations & API Access
            </div>
            <div className="pricing__feature">Scalability for Enterprise</div>
          </div>
          <button
            className="pricing__btn"
            onClick={() => handlePlanSelection("Custom", 1000000)}
          >
            Get Custom Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
