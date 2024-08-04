import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Session.css";
import axios from "axios";
import formatDateTime from "../../../utils/formatDateTime";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";

const Session = () => {
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/sessions`
      );
      setSessions(response.data.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const handleRefresh = () => {
    fetchSessions();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSessions = sessions.filter((session) =>
    session.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSessions = filteredSessions.sort((a, b) => {
    return new Date(b.logged_in) - new Date(a.logged_in);
  });

  const handleShowClick = (sessionId) => {
    navigate(`/admin/history/${sessionId}`);
  };

  return (
    <>
      <div className="session__container">
        <span className="session__title">Session</span>
        <div className="session__search">
          <input
            type="text"
            placeholder="Search"
            className="session__searchInput"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="session__button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>
      <div className="session__box">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Session ID</th>
              <th>Prompt count</th>
              <th>Logged In</th>
              <th>Logged Out</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {sortedSessions.map((session, index) => (
              <tr key={session.session_id}>
                <td>{index + 1}</td>
                <td>{session.username}</td>
                <td>{session.session_id}</td>
                <td>{session.prompt_count}</td>
                <td>{formatDateTime(session.logged_in)}</td>
                {session.session_ended ? (
                  <td>{formatDateTime(session.logged_out)}</td>
                ) : (
                  <td>Not Logged Out</td>
                )}
                <td>
                  <button
                    className="session__btn"
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
