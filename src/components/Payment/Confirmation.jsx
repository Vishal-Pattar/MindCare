import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./Payment.css";
import { useAlert } from "../../context/AlertContext";
import { formatDateTimeinTransaction } from "../../utils/formatDateTime";
import { RiCopperCoinFill } from "react-icons/ri";
import { triggerFetchCredits } from "../../hooks/useCredits";

const Confirmation = () => {
  const [paymentConfirmation, setPaymentConfirmation] = useState(null);
  const { addAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const session_id = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (session_id) {
      const verifyPayment = async () => {
        try {
          const response = await axios.post(
            "/payments/verify-payment-session",
            {
              session_id,
            }
          );
          setPaymentConfirmation(response.data.data);
          triggerFetchCredits();
        } catch (error) {
          addAlert(
            error.response?.data?.message || "Failed to verify payment.",
            "error",
            "bottom_right"
          );
        }
      };
      verifyPayment();
    }
  }, [addAlert]);

  const getStatusClass = (status) => {
    const statusClasses = {
      paid: "payment__success",
      pending: "payment__pending",
      unpaid: "payment__fail",
    };
    return statusClasses[status.toLowerCase()] || "";
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  if (!paymentConfirmation) {
    return (
      <div className="payment__container">
        <span className="payment__loading">
          Loading payment confirmation...
        </span>
      </div>
    );
  }

  return (
    <div className="payment__container">
      <div className="payment__header">
        <h1 className="payment__title">Payment Confirmation</h1>
      </div>
      <div
        className={`payment__info ${getStatusClass(
          paymentConfirmation.paymentStatus
        )}`}
      >
        <p>
          <span className="payment__label">Username:</span>{" "}
          {paymentConfirmation.username}
        </p>
        <p>
          <span className="payment__label">Transaction ID:</span>{" "}
          {paymentConfirmation.transactionId}
        </p>
        <p>
          <span className="payment__label">Amount:</span> ₹
          {paymentConfirmation.amount}
        </p>
        <p>
          <span className="payment__label">Credits:</span>
          <span className="payment__coin">
            {paymentConfirmation.credits} <RiCopperCoinFill />
          </span>
        </p>
        <p>
          <span className="payment__label">Status:</span>{" "}
          <span className={getStatusClass(paymentConfirmation.paymentStatus)}>
            {capitalize(paymentConfirmation.paymentStatus)}
          </span>
        </p>
        <p>
          <span className="payment__label">Date:</span>{" "}
          {formatDateTimeinTransaction(paymentConfirmation.updatedAt)}
        </p>
      </div>
      <div className="payment__actions">
        <button className="payment__button" onClick={() => navigate("/wallet")}>
          Back to Wallet
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
