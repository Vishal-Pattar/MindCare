import React from "react";
import "./Wallet.css";
import WalletHeader from "./WalletHeader";
import WalletTransaction from "./WalletTransaction";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const Wallet = () => {
  return (
    <div className="wallet__container">
      <WalletHeader />
      <WalletTransaction />
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(Wallet);
