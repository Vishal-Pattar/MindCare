import React, { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import axios from "axios";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";

const Email = () => {
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [adminEmail, setAdminEmail] = useState("admin");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !subject || !body || !adminEmail) {
      addAlert("Please fill all the fields", "error", "bottom_right");
    } else {
      setLoading(true); // Disable button when the request is initiated
      const apiUrl = process.env.REACT_APP_API_URL;
      axios
        .post(
          `${apiUrl}/api/v1/admin/email`,
          {
            adminEmail,
            email,
            subject,
            body,
          },
          config
        )
        .then((res) => {
          addAlert("Email Sent Successfully", "success", "bottom_right");
        })
        .catch((err) => {
          console.log(err);
          addAlert("Email Not Sent", "error", "bottom_right");
        })
        .finally(() => {
          setLoading(false); // Re-enable button after response
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin__container">
        <span className="admin__title">Email</span>
        <div className="admin__cover">
          <select
            name="admin__email"
            className="admin__email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="no-reply">no-reply</option>
          </select>
          <div className="admin__button">Refresh</div>
        </div>
      </div>
      <div className="admin__box admin__box--email">
        <div className="admin__form--container-box">
          <div className="admin__form--container">
            <div className="admin__form--input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Receiver's Email"
              />
            </div>
            <div className="admin__form--input">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter your Subject"
              />
            </div>
            <div className="admin__form--input">
              <label htmlFor="username">Body</label>
              <textarea
                type="text"
                id="body"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter your Body"
              ></textarea>
            </div>
            <span className="admin__form--btn-grp">
              <button
                type="submit"
                className="admin__form--button"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default withAuthorization(Permissions.Admin_Access)(Email);
