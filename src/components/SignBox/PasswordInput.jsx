import { useState } from "react";

const PasswordInput = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signbox__input">
      <label htmlFor="newPassword">*New Password</label>
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          id="newPassword"
          placeholder="Enter your Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ paddingRight: "40px" }} // Ensure space for the eye icon
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? "🙈" : "👁️"} {/* Use an icon or emoji */}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
