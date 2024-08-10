import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import formatDateTime from "../../../utils/formatDateTime";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";
import Toggle from "../Custom/Toggle";
import { useAlert } from "../../../context/AlertContext";

const Session = () => {
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdminSessions, setShowAdminSessions] = useState(false);
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  const { addAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get("/api/v1/admin/sessions", config
      );
      setSessions(response.data.data);
    } catch (error) {
      addAlert(error.response.data.message || error.message, "error", "bottom_right");
    }
  };

  const handleRefresh = () => {
    fetchSessions();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggle = () => {
    setShowAdminSessions((prevShowAdminSessions) => !prevShowAdminSessions);
  };

  const filteredSessions = sessions
    .filter((session) => session.username.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((session) => showAdminSessions || session.username !== "Admin");

  const sortedSessions = filteredSessions.sort((a, b) => {
    return new Date(b.logged_in) - new Date(a.logged_in);
  });

  const handleShowClick = (sessionId) => {
    navigate(`/admin/history/${sessionId}`);
  };

  return (
    <>
      <div className="admin__container">
        <span className="admin__title">Session</span>
        <div className="admin__cover">
          <input
            type="text"
            placeholder="Search"
            className="admin__input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="admin__checkbox">
            <Toggle permit={showAdminSessions} onClick={handleToggle} />
          </div>
          <button className="admin__button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>
      <div className="admin__box">
        <table className="admin__box--table">
          <thead>
            <tr className="admin__box--tr">
              <th>No</th>
              <th>Username</th>
              <th>Session Title</th>
              <th>Prompt count</th>
              <th>Logged In</th>
              <th>Logged Out</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {sortedSessions.map((session, index) => (
              <tr key={session.session_id} className="admin__box--tr">
                <td>{index + 1}</td>
                <td>{session.username}</td>
                <td>{session.session_title}</td>
                <td>{session.prompt_count}</td>
                <td>{formatDateTime(session.logged_in)}</td>
                {session.session_ended ? (
                  <td>{formatDateTime(session.logged_out)}</td>
                ) : (
                  <td>Not Logged Out</td>
                )}
                <td>
                  <button
                    className="admin__button admin__button--small"
                    onClick={() => handleShowClick(session.session_id)}
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default withAuthorization(Permissions.Admin_Access)(Session);