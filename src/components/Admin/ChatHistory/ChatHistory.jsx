import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import formatDateTime from "../../../utils/formatDateTime";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";
import { useAlert } from "../../../context/AlertContext";

const ChatHistory = () => {
  const { sessionId } = useParams();
  const [history, setHistory] = useState([]);
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  useEffect(() => {
    fetchHistory();
  }, [sessionId]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `/api/v1/admin/history/${sessionId}`,
        config
      );
      setHistory(response.data);
    } catch (error) {
      addAlert(
        error.response.data.message || error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const handleRefresh = () => {
    fetchHistory();
  };

  return (
    <>
      <div className="admin__container">
        <span className="admin__title">Chat History</span>
        <div className="admin__stats">
          <div className="admin__stat blueColor">
            {history.session && history.session.session_title}
          </div>
          {history.session && history.session.prompt_count ? (
            <div className="admin__stat">
              Prompt Count: {history.session.prompt_count}
            </div>
          ) : null}
          <button className="admin__button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>
      <div className="admin__box admin__box--chathistory">
        <div className="admin__datetime">
          <span>
            Session Created at:{" "}
            {history.session && formatDateTime(history.session.logged_in)}
          </span>
        </div>
        {history.data && history.data.length > 0 ? (
          history.data.map((chat, index) => (
            <div key={index} className="admin__history--item">
              <div className="admin__prompt">
                <pre className="admin__prompt--pre">
                  <Markdown>{chat.prompt}</Markdown>
                </pre>
              </div>
              <div className="admin__response">
                <pre className="admin__response--pre">
                  <Markdown>{chat.response}</Markdown>
                </pre>
              </div>
            </div>
          ))
        ) : (
          <div className="admin__history--item">
            <div className="admin__chat--error">
              <span>No chat history found</span>
            </div>
          </div>
        )}
        <div className="admin__datetime">
          <span>
            Session Ended at:{" "}
            {history.session && formatDateTime(history.session.logged_out)}
          </span>
        </div>
      </div>
    </>
  );
};

export default withAuthorization(Permissions.Admin_Access)(ChatHistory);
