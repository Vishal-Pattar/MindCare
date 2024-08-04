import { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

export const triggerFetchCredits = () => {
  const event = new Event("fetchCredits");
  window.dispatchEvent(event);
};

const useCredits = () => {
  const [credits, setCredits] = useState(0);
  const token = sessionStorage.getItem("authToken");
  const username = sessionStorage.getItem("username");
  const { addAlert } = useAlert();

  const fetchCredits = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/metrics/credits`,
        { username: username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCredits(response.data.data);
    } catch (error) {
      console.error(error);
      addAlert(error.response?.data?.error || "An error occurred", "error");
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