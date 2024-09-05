import React, { useState } from "react";
import "./Feedback.css";
import { useAlert } from "../../context/AlertContext";

const ReportIssue = () => {
  const [issueText, setIssueText] = useState("");
  const { addAlert, removeAlertByContent } = useAlert();

  const handleReportIssueChange = (e) => {
    if (e.target.value.length <= 500) {
      setIssueText(e.target.value);
      removeAlertByContent(
        "You have reached the maximum limit of 500 characters."
      );
    } else {
      addAlert(
        "You have reached the maximum limit of 500 characters.",
        "error",
        "bottom_right"
      );
    }
  };

  const handleSubmit = () => {
    if (issueText.trim()) {
      addAlert("Issue reported successfully!", "info", "bottom_right");
    } else {
      addAlert(
        "Please provide issue before submitting.",
        "error",
        "bottom_right"
      );
    }
  };

  return (
    <div className="feedback__container">
      <div className="feedback__title">Report Issue</div>
      <div className="feedback__description">
        Click below to report any issues you are facing.
      </div>
      <div className="feedback__checkboxGroup">
        <label className="feedback__checkbox--container">
          <input type="checkbox" />
          <svg viewBox="0 0 64 64" height="1rem" width="1rem">
            <path
              d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
              pathLength="575.0541381835938"
              className="path"
            ></path>
          </svg>
          <span>Login/Register</span>
        </label>
        <label className="feedback__checkbox--container">
          <input type="checkbox" />
          <svg viewBox="0 0 64 64" height="1rem" width="1rem">
            <path
              d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
              pathLength="575.0541381835938"
              className="path"
            ></path>
          </svg>
          <span>Chatting</span>
        </label>
      </div>
      <div className="feedback__inputGroup">
        <label htmlFor="issueText">
          If you are facing any issues, please describe them here.
        </label>
        <textarea
          id="issueText"
          placeholder="Enter your issue here"
          value={issueText}
          onChange={handleReportIssueChange}
        />
        <span>{issueText.length + "/500"}</span>
      </div>
      <button className="feedback__submitBtn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ReportIssue;
