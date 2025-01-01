import { useState } from "react";
import axios from "../api/axios.js";
import { useAlert } from "../context/AlertContext";
import useCredits, { triggerFetchCredits } from "./useCredits";

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const { addAlert } = useAlert();
  const credits = useCredits();

  const addMessage = async (userMessage) => {
    if (credits <= 0) {
      addAlert(
        "You have no credits left. Please buy more credits to continue.",
        "error",
        "top_center"
      );
      return;
    }
    const tempMessageId = Date.now();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: tempMessageId,
        user: userMessage,
        output: "Loading...",
        loading: true,
      },
    ]);

    try {
      const response = await axios.post("/generate", {
        prompt: userMessage,
      });

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === tempMessageId
            ? { ...msg, output: response.data.response, loading: false }
            : msg
        )
      );
      triggerFetchCredits();
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== tempMessageId)
      );
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return [messages, addMessage, clearMessages];
};

export default useMessages;
