import { useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import { triggerFetchCredits } from "./useCredits";

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const token = sessionStorage.getItem("authToken");
  const { addAlert } = useAlert();

  const addMessage = async (userMessage) => {
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
      const response = await axios.post("/api/v1/generate",
        { prompt: userMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
        error.response?.data?.error || error.message,
        "error",
        "signbox"
      );
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return [messages, addMessage, clearMessages];
};

export default useMessages;
