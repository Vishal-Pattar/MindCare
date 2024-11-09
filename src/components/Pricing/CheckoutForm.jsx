import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useAlert } from "../../context/AlertContext";

const CheckoutForm = ({ amount, planName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { addAlert } = useAlert();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState(""); // State for UPI ID

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const {
        data: { clientSecret },
      } = await axios.post(`${apiUrl}/api/v1/payments/create-payment-intent`, {
        amount,
        currency: "inr",
      });

      if (paymentMethod === "card") {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardNumberElement),
            },
          }
        );

        if (error) {
          addAlert(`Payment failed: ${error.message}`, "error", "bottom_right");
        } else if (paymentIntent.status === "succeeded") {
          addAlert(
            `Payment for ${planName} plan successful!`,
            "success",
            "bottom_right"
          );
        }
      } else if (paymentMethod === "upi") {
        const { error, paymentIntent } = await stripe.confirmUPIIntent(
          clientSecret,
          {
            payment_method: {
              upi: {
                vpa: upiId, // Use the entered UPI ID
              },
            },
          }
        );

        if (error) {
          addAlert(`Payment failed: ${error.message}`, "error", "bottom_right");
        } else if (paymentIntent.status === "succeeded") {
          addAlert(
            `Payment for ${planName} plan successful!`,
            "success",
            "bottom_right"
          );
        }
      }
    } catch (error) {
      addAlert(
        "An error occurred while processing payment.",
        "error",
        "bottom_right"
      );
    }
  };

  return (
    <div className="pricing__checkout">
      <div className="pricing__title">Checkout for {planName} Plan</div>
      <form onSubmit={handleSubmit}>
        <div className="pricing__input">
          <label>Select Payment Method</label>
          <div className="pricing__radio-group">
            <label className="pricing__radio-label">
              <input
                type="radio"
                className="pricing__radio-input"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span className="pricing__radio-custom"></span>
              Card
            </label>
            <label className="pricing__radio-label">
              <input
                type="radio"
                className="pricing__radio-input"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              <span className="pricing__radio-custom"></span>
              UPI
            </label>
          </div>
        </div>

        {paymentMethod === "card" && (
          <>
            <div className="pricing__input">
              <label>Card Number</label>
              <CardNumberElement />
            </div>
            <div className="pricing__input">
              <label>Expiry Date</label>
              <CardExpiryElement />
            </div>
            <div className="pricing__input">
              <label>CVC</label>
              <CardCvcElement />
            </div>
          </>
        )}

        {paymentMethod === "upi" && (
          <div className="pricing__input">
            <label>UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)} // Update state on input change
              className="input"
              placeholder="Enter your UPI ID"
              required
            />
          </div>
        )}

        <div className="pricing__input">
          <label>Amount</label>
          <input
            type="text"
            value={`₹${(amount / 100).toFixed(2)}`}
            disabled
            className="disabled-input"
          />
        </div>

        <button type="submit" disabled={!stripe} className="pricing__button">
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
