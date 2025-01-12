import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiCopperCoinFill } from "react-icons/ri";
import { useAlert } from "../../context/AlertContext.js";
import axios from "../../api/axios.js";
import formatDateTime from "../../utils/formatDateTime.js";

const WalletHeader = () => {
  const [userData, setUserData] = useState();
  const { addAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get("/metrics/wallet");
        setUserData(response.data.data);
      } catch (error) {
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    fetchMetrics();
  }, []);

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="wallet__header">
      <span className="wallet__title">My Wallet</span>
      <span className="wallet__info">
        Username:&nbsp;<span>{userData?.username}</span>
      </span>
      <div className="wallet__balance">
        <span>
          {userData?.credits_available}
          <RiCopperCoinFill />
        </span>
        <div className="wallet__last-updated">
          Last Updated: {formatDateTime(userData?.last_updated)}
        </div>
        <div className="wallet__actions">
          <button className="wallet__button" onClick={handleRefresh}>
            Refresh
          </button>
          <button
            className="wallet__button"
            onClick={() => navigate("/checkout")}
          >
            Top Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;
