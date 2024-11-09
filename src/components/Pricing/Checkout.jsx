import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51PiJTbHVkQLkXS7CBXliWU4YKjZJ53Z3A8HGArwMlZc0heh1Xnl1a9ciMP6GyA4xug4vn0WDDmefdiB2J2fc3KDF00NA7KXOsi");

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Checkout = () => {
  const query = useQuery();
  const planName = query.get("plan");
  const amount = query.get("amount");

  return (
    <div className="pricing__container pricing__container--checkout">
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} planName={planName} />
      </Elements>
    </div>
  );
};

export default Checkout;
