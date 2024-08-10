import React, { useState, useEffect } from "react";
import Toggle from "../Custom/Toggle";
import axios from "axios";
import withAuthorization from "../../../utils/withAuthorization";
import { Permissions } from "../../../utils/roles";
import { useAlert } from "../../../context/AlertContext";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/v1/admin/users",
        config
      );
      setUsers(response.data.data);
    } catch (error) {
      addAlert(
        error.response.data.message || error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  const handleToggle = async (user) => {
    const updatedUsers = users.map((u) =>
      u.username === user.username ? { ...u, permit: !u.permit } : u
    );

    try {
      const response = await axios.patch(`/api/v1/admin/users/${user.username}/permit`,{},
        config
      );
      setUsers(updatedUsers);
      addAlert(response.data.message, "success", "bottom_right");
    } catch (error) {
      console.log(error);
      addAlert(
        error.response.data.message || error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const handleRoleChange = async (user, newRole) => {
    const updatedUsers = users.map((u) =>
      u.username === user.username ? { ...u, role: newRole } : u
    );

    try {
      const response = await axios.patch(`/api/v1/admin/users/${user.username}/role`,
        { role: newRole }, config
      );
      setUsers(updatedUsers);
      addAlert(response.data.message, "success", "bottom_right");
    } catch (error) {
      addAlert(
        error.response.data.message || error.message,
        "error",
        "bottom_right"
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="admin__container">
        <span className="admin__title">Users</span>
        <div className="admin__cover">
          <input
            type="text"
            placeholder="Search"
            className="admin__input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="admin__button" onClick={handleRefresh}>
            Refresh
          </button>
          <div className="admin__checkbox">Show</div>
        </div>
      </div>
      <div className="admin__box">
        <table className="admin__box--table">
          <thead>
            <tr className="admin__box--tr">
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Coupon</th>
              <th>Role</th>
              <th>Permit</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.username} className="admin__box--tr">
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.coupon}</td>
                <td>
                  <select
                    className="admin__select"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Tester">Tester</option>
                    <option value="Member">Member</option>
                  </select>
                </td>
                <td className="center">
                  <Toggle
                    permit={user.permit}
                    onClick={() => handleToggle(user)}
                  />
                </td>
                <td>
                  <Link to={`/admin/profile/${user.username}`}>
                    <button className="admin__button admin__button--small">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default withAuthorization(Permissions.Admin_Access)(Users);
