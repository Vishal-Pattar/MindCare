import React, { useState } from "react";
import "./Feedback.css";
import { useAlert } from "../../context/AlertContext";
import Checkbox from "./Checkbox";

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
      <div className="feedback__inputGroup">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="feedback__checkboxGroup">
        <Checkbox name="Login/Register"/>
        <Checkbox name="Profile"/>
        <Checkbox name="Subscription"/>
        <Checkbox name="Payment"/>
        <Checkbox name="Others"/>
      </div>
      <div className="feedback__inputGroup">
        <label htmlFor="issueText">
          If you are facing any issues, please describe them here.
        </label>
        <textarea
          id="issueText"
          placeholder="I am Facing an issue with..."
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
