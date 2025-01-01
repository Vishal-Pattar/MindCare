import React, { useState, useEffect } from "react";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";
import { useAlert } from "../../../context/AlertContext";
import axios from "../../../api/axios.js";
import timeAgo from "../../../utils/timeAgo";
import Checkbox from "./Checkbox";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const { addAlert } = useAlert();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("/issues/all");
        setIssues(response.data.data);
      } catch (error) {
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    fetchIssues();
  }, [addAlert]);

  return (
    <>
      <div className="admin__container">
        <span className="admin__title">Issues</span>
        <div className="admin__cover">
          <div className="admin__stat">You have {issues.length} issues</div>
        </div>
      </div>
      <div className="admin__box admin__box--notification">
        {issues.map((issue, index) => (
          <div key={index} className="admin__notification">
            <div className="admin__notification--checkbox">
              <Checkbox name={index} />
            </div>
            <div className="admin__notification--content">
              <div className="admin__notification--header">
                <div className="admin__notification--title">
                  {issue.issue_type}
                </div>
                <div className="admin__notification--time">
                  {timeAgo(issue.reported_at)}
                </div>
              </div>
              <div className="admin__notification--description">
                {issue.issue_text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default withAuthorization(Permissions.Admin_Access)(Issues);
