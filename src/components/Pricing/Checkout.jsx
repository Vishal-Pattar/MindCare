import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useLocation, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAlert } from "../../context/AlertContext";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import axios from "../../api/axios";
import { decodeFromBase64Url } from "../../utils/Base64Url.js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const useQuery = () => new URLSearchParams(useLocation().search);

const Checkout = () => {
  const query = useQuery();
  const encodedData = query.get("data");
  const { addAlert } = useAlert();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [plan, setPlan] = useState("Pay as you go");
  const [amount, setAmount] = useState("");
  const [credits, setCredits] = useState("");

  useEffect(() => {
    if (encodedData) {
      try {
        const decodedData = decodeFromBase64Url(encodedData);
        setPlan(decodedData.planName);
        setAmount(decodedData.amount);
        setCredits(decodedData.amount / 2);
      } catch (error) {
        addAlert("Invalid payment data.", "error", "bottom_right");
      }
    }
  }, [encodedData, addAlert]);

  const handleAmountChange = (value) => {
    const numericValue = parseFloat(value);
    if (numericValue) {
      setAmount(numericValue);
      setCredits(parseInt(numericValue / 2));
    } else {
      setAmount("");
      setCredits("");
    }
  };

  const handleCheckout = async () => {
    if (!termsAccepted) {
      addAlert(
        "Please accept the terms and conditions.",
        "error",
        "bottom_right"
      );
      return;
    }

    const stripe = await stripePromise;

    if (!stripe) {
      addAlert("Stripe failed to initialize.", "error", "bottom_right");
      return;
    }

    try {
      const response = await axios.post("/payments/create-checkout-session", {
        planName: plan,
        amount,
      });

      const { sessionId } = response.data;

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        addAlert(
          `Stripe checkout failed: ${error.message}`,
          "error",
          "bottom_right"
        );
      }
    } catch (error) {
      console.error("Error creating Stripe Checkout session:", error);
      addAlert(
        "Failed to redirect to Stripe checkout.",
        "error",
        "bottom_right"
      );
    }
  };

  return (
    <div className="checkout__container">
      <div className="checkout__title">Secure Checkout</div>
      <div className="checkout__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
        autem.
      </div>
      <div className="checkout__inputGroup">
        <label htmlFor="plan">Plan</label>
        <input id="plan" type="text" value={plan} readOnly disabled />
      </div>
      <div className="checkout__inputGroup">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          disabled={!!encodedData}
          required
        />
      </div>
      <div className="checkout__inputGroup">
        <label htmlFor="credits">Credits</label>
        <input id="credits" type="text" value={credits} readOnly disabled />
      </div>
      <div
        className="checkout__checkbox"
        onClick={() => setTermsAccepted(!termsAccepted)}
      >
        {termsAccepted ? (
          <FaCheckSquare size={20} className="checkout__checkbox--icon1" />
        ) : (
          <FaRegSquare size={20} className="checkout__checkbox--icon2" />
        )}
        <span>
          I accept the&nbsp;
          <Link to="/terms" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </Link>
        </span>
      </div>
      <button
        onClick={handleCheckout}
        className={`checkout__button ${
          !termsAccepted ? "checkout__button--disabled" : ""
        }`}
        disabled={!termsAccepted}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
