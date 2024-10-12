import React, { useState } from "react";
import "./Feedback.css";
import axios from "axios";
import { useAlert } from "../../context/AlertContext";
import Checkbox from "./Checkbox";

const ReportIssue = () => {
  const [issueText, setIssueText] = useState("");
  const [email, setEmail] = useState("");
  const [selectedIssueTypes, setSelectedIssueTypes] = useState([]);
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

  const handleCheckboxChange = (name) => {
    if (selectedIssueTypes.includes(name)) {
      setSelectedIssueTypes(selectedIssueTypes.filter((type) => type !== name));
    } else {
      setSelectedIssueTypes([...selectedIssueTypes, name]);
    }
  };

  const handleSubmit = async () => {
    if (!email || !issueText.trim() || selectedIssueTypes.length === 0) {
      addAlert(
        "Please provide all the required fields.",
        "error",
        "bottom_right"
      );
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/feed/issue`, {
        email,
        issueText,
        issueType: selectedIssueTypes,
      });

      if (response.data.status === "success") {
        addAlert("Issue reported successfully!", "info", "bottom_right");
        setIssueText("");
        setEmail("");
        setSelectedIssueTypes([]);
      }
    } catch (error) {
      addAlert(
        error.response ? error.response.data.message : error.message,
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="feedback__checkboxGroup">
        <Checkbox
          name="Login/Register"
          checked={selectedIssueTypes.includes("Login/Register")}
          onChange={() => handleCheckboxChange("Login/Register")}
        />
        <Checkbox
          name="Profile"
          checked={selectedIssueTypes.includes("Profile")}
          onChange={() => handleCheckboxChange("Profile")}
        />
        <Checkbox
          name="Subscription"
          checked={selectedIssueTypes.includes("Subscription")}
          onChange={() => handleCheckboxChange("Subscription")}
        />
        <Checkbox
          name="Payment"
          checked={selectedIssueTypes.includes("Payment")}
          onChange={() => handleCheckboxChange("Payment")}
        />
        <Checkbox
          name="Others"
          checked={selectedIssueTypes.includes("Others")}
          onChange={() => handleCheckboxChange("Others")}
        />
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
