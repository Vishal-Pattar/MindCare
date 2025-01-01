import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { useAlert } from "../context/AlertContext";

export const triggerFetchCredits = () => {
  const event = new Event("fetchCredits");
  window.dispatchEvent(event);
};

const useCredits = () => {
  const [credits, setCredits] = useState(0);
  const { addAlert } = useAlert();

  const fetchCredits = async () => {
    try {
      const response = await axios.get("/metrics/user");
      setCredits(response.data.data.credits_available);
    } catch (error) {
      addAlert(
        error.response.data.error || error.message,
        "error",
        "bottom_right"
      );
    }
  };

  useEffect(() => {
    const handleCustomEvent = () => {
      fetchCredits();
    };

    window.addEventListener("fetchCredits", handleCustomEvent);

    return () => {
      window.removeEventListener("fetchCredits", handleCustomEvent);
    };
  }, []);

  return credits;
};

export default useCredits;
