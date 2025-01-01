import React, { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import axios from "../../../api/axios.js";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";

const Invitation = () => {
  const { addAlert } = useAlert();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("registration");
  const [credits, setCredits] = useState("20");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !nickname || !emailTemplate || !credits) {
      addAlert("Please fill all the fields", "error", "bottom_right");
    } else {
      setLoading(true);
      axios
        .post("/email/invite", {
          email,
          nickname,
          emailTemplate,
          credits,
        })
        .then((res) => {
          setEmail("");
          setNickname("");
          setEmailTemplate("registration");
          setCredits("20");
          addAlert("Invitation sent successfully", "success", "bottom_right");
        })
        .catch((err) => {
          console.log(err);
          addAlert("Invitation not sent", "error", "bottom_right");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin__container">
        <span className="admin__title">Invitation</span>
        <div className="admin__stats">
          <div className="admin__stat">Sent 0</div>
          <div className="admin__stat">Pending 0</div>
          <div className="admin__stat">Accepted 0</div>
          <div className="admin__button">Refresh</div>
        </div>
      </div>
      <div className="admin__box admin__box--email">
        <div className="admin__form--container-box">
          <div className="admin__form--container">
            <span className="admin__header">
              <div className="admin__title">Invite Team Members</div>
              <div className="admin__description">
                Send invitations to join your Product.
              </div>
            </span>
            <div className="admin__form--input">
              <label htmlFor="nickname">Nickname</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter Nickname"
              />
            </div>
            <div className="admin__form--input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>
            <div className="admin__form--group">
              <div className="admin__form--select">
                <label htmlFor="template">Email Template</label>
                <select
                  type="text"
                  id="template"
                  name="template"
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                >
                  <option value="registration">Registration</option>
                  <option value="reset-password">Reset Password</option>
                </select>
              </div>
              <div className="admin__form--input">
                <label htmlFor="credits">Credits</label>
                <input
                  type="text"
                  id="credits"
                  name="credits"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  placeholder="Enter Credits"
                />
              </div>
            </div>
            <span className="admin__form--btn-grp">
              <button
                type="submit"
                className="admin__form--button"
                disabled={loading}
              >
                {loading ? "Inviting..." : "Invite"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default withAuthorization(Permissions.Admin_Access)(Invitation);
