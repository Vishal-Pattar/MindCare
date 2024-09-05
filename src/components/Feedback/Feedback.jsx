import React, { useState } from "react";
import "./Feedback.css";
import { useAlert } from "../../context/AlertContext";
import {
  BsEmojiAngryFill,
  BsEmojiFrownFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsEmojiLaughingFill,
} from "react-icons/bs";

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const { addAlert } = useAlert();

  const handleFeedbackChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const handleSubmit = () => {
    if (feedbackText.trim()) {
      addAlert("Feedback submitted successfully!", "success", "bottom_right");
    } else {
      addAlert("Please provide feedback before submitting.", "error", "bottom_right");
    }
  };

  const ratingOptions = [
    {
      id: 1,
      label: "Terrible",
      icon: <BsEmojiAngryFill className="feedback__icon" />,
    },
    { id: 2, label: "Bad", icon: <BsEmojiFrownFill className="feedback__icon" /> },
    {
      id: 3,
      label: "Okay",
      icon: <BsEmojiNeutralFill className="feedback__icon" />,
    },
    { id: 4, label: "Good", icon: <BsEmojiSmileFill className="feedback__icon" /> },
    {
      id: 5,
      label: "Amazing",
      icon: <BsEmojiLaughingFill className="feedback__icon" />,
    },
  ];

  return (
    <div className="feedback__container">
      <div className="feedback__title">Give Feedback</div>
      <div className="feedback__description">
        How was your experience with our service?
      </div>
      <div className="feedback__ratingGroup">
        {ratingOptions.map((option) => (
          <div className="feedback__rating" key={option.id}>
            <input type="radio" name="rating" id={`rating-${option.id}`} />
            <label htmlFor={`rating-${option.id}`} className={`feedback__rating${option.id}`}>
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
