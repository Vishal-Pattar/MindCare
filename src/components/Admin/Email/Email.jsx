import React, { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import axios from "../../../api/axios.js";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";

const Email = () => {
  const { addAlert } = useAlert();
  const [senderEmail, setSenderEmail] = useState("admin");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiverEmail || !emailSubject || !emailBody || !senderEmail) {
      addAlert("Please fill all the fields", "error", "bottom_right");
    } else {
      setLoading(true);
      axios
        .post("/email/custom", {
          senderEmail,
          receiverEmail,
          emailSubject,
          emailBody,
        })
        .then((res) => {
          addAlert("Email Sent Successfully", "success", "bottom_right");
        })
        .catch((err) => {
          console.log(err);
          addAlert("Email Not Sent", "error", "bottom_right");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin__box admin__box--email">
        <div className="admin__form--container-box">
          <div className="admin__form--container">
            <span className="admin__header--span">
              <span>
                <div className="admin__title">Send Custom Emails</div>
                <div className="admin__description">
                  Use this form to send custom emails to your users.
                </div>
              </span>
              <div className="admin__form--select admin__form--select-tr">
                <select
                  id="from"
                  name="sender_email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="no-reply">No-Reply</option>
                </select>
              </div>
            </span>
            <div className="admin__form--input">
              <label htmlFor="receiverEmail">Receiver Email</label>
              <input
                type="text"
                id="receiverEmail"
                name="receiverEmail"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                placeholder="Enter Receiver's Email"
              />
            </div>
            <div className="admin__form--input">
              <label htmlFor="emailSubject">Subject</label>
              <input
                type="text"
                id="emailSubject"
                name="emailSubject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter your Subject"
              />
            </div>
            <div className="admin__form--input">
              <label htmlFor="emailBody">Body</label>
              <textarea
                id="emailBody"
                name="emailBody"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
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
