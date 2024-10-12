import React, { useState } from "react";
import "./Feedback.css";
import { useAlert } from "../../context/AlertContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ratingOptions from "./ratingOptions";

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const { addAlert } = useAlert();
  const navigate = useNavigate();

  // Handle feedback text change
  const handleFeedbackChange = (e) => {
    setFeedbackText(e.target.value);
  };

  // Handle rating selection change
  const handleRatingChange = (id) => {
    setSelectedRating(id);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedRating) {
      addAlert(
        "Please choose a rating before submitting.",
        "error",
        "bottom_right"
      );
      return;
    }

    // Retrieve username from session storage
    const username = sessionStorage.getItem("username");
    const session = sessionStorage.getItem("session");

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/feed/feedback`, {
        username,
        session,
        rating: selectedRating,
        feedbackText,
      });

      if (response.data.status === "success") {
        addAlert("Feedback submitted successfully!", "info", "bottom_right");
        setFeedbackText("");
        setSelectedRating(null);

        sessionStorage.removeItem("username");
        sessionStorage.removeItem("session");

        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      addAlert(
        error.response ? error.response.data.message : error.message,
        "error",
        "bottom_right"
      );
    }
  };

  return (
    <div className="feedback__container">
      <div className="feedback__title">Give Your Feedback</div>
      <div className="feedback__description">
        How was your experience with our service?
      </div>
      <div className="feedback__ratingGroup">
        {ratingOptions.map((option) => (
          <div className="feedback__rating" key={option.id}>
            <input
              type="radio"
              name="rating"
              id={`rating-${option.id}`}
              onChange={() => handleRatingChange(option.id)}
              checked={selectedRating === option.id}
            />
            <label
              htmlFor={`rating-${option.id}`}
              className={`feedback__rating${option.id}`}
            >
              {option.icon}
              <span>{option.label}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="feedback__inputGroup">
        <label htmlFor="feedbackText">
          What are the main reasons for your ratings?
        </label>
        <textarea
          id="feedbackText"
          placeholder="Enter your feedback here"
          value={feedbackText}
          onChange={handleFeedbackChange}
        />
      </div>
      <button className="feedback__submitBtn" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export default Feedback;
