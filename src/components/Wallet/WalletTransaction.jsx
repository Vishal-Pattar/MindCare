import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import formatDateTime from "../../utils/formatDateTime.js";
import { useAlert } from "../../context/AlertContext.js";

const WalletTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { addAlert } = useAlert();

  const columns = [
    { header: "Sr" },
    { header: "Datetime" },
    { header: "Transaction Id" },
    { header: "Plan Name" },
    { header: "Amount" },
    { header: "Credits" },
    { header: "Status" },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/payments/transactions");
        setTransactions(response.data.data);
      } catch (error) {
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    fetchTransactions();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "greenColor";
      case "pending":
        return "yellowColor";
      case "unpaid":
        return "redColor";
      default:
        return "";
    }
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="wallet__transactions">
      <table className="wallet__table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDateTime(transaction.createdAt)}</td>
                <td>{transaction.transactionId}</td>
                <td>{transaction.planName}</td>
                <td>₹{transaction.amount}</td>
                <td>{transaction.credits}</td>
                <td className={getStatusClass(transaction.paymentStatus)}>
                  {capitalize(transaction.paymentStatus)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTransaction;
