import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAlert } from "../../context/AlertContext";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { RiCopperCoinFill } from "react-icons/ri";
import axios from "../../api/axios";
import { decodeFromBase64Url } from "../../utils/Base64Url.js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Checkout = () => {
  const query = useQuery();
  const encodedData = query.get("data");
  const { addAlert } = useAlert();
  const [termsAccepted, setTermsAccepted] = useState(false);

  let planName = "";
  let amount = 0;
  let credits = 0;

  if (encodedData) {
    try {
      const decodedData = decodeFromBase64Url(encodedData); // Decode the query parameter
      planName = decodedData.planName;
      amount = decodedData.amount;
      credits = amount / 2; // Calculate credits
    } catch (error) {
      addAlert("Invalid payment data.", "error", "bottom_right");
    }
  }

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
        planName,
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
      <h1 className="checkout__title">Secure Checkout</h1>
      <div className="checkout__description-box">
        <h2 className="checkout__heading">Description of Purchase</h2>
        <div className="checkout__details">
          <p>
            <strong>Plan:</strong> {planName}
          </p>
          <p>
            <strong>Amount:</strong> ₹{amount}
          </p>
          <p>
            <strong>Credits:</strong>
            <span>
              {credits}
              <RiCopperCoinFill className="checkout__coin--icon" />
            </span>
            will be added to your wallet
          </p>
        </div>
      </div>
      <div className="checkout__terms">
        <div
          className="checkout__checkbox"
          onClick={() => setTermsAccepted(!termsAccepted)}
        >
          {termsAccepted ? (
            <FaCheckSquare size={20} className="checkout__checkbox--icon1" />
          ) : (
            <FaRegSquare size={20} className="checkout__checkbox--icon2" />
          )}
          <label>
            I accept the{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>
          </label>
        </div>
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
