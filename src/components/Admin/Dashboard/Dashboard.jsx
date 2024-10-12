import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../Graphs/StatCard/StatCard";
import { useAlert } from "../../../context/AlertContext";

const Dashboard = () => {
  const { addAlert } = useAlert();
  const authToken = sessionStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const [data, setData] = useState([]);
  const [stats, setStats] = useState([
    { title: "Total Users", value: 0, icon: "👤" },
    { title: "Total Sessions", value: 0, icon: "📅" },
    { title: "Report Issues", value: 0, icon: "📝" },
    { title: "Total Prompts", value: 0, icon: "💬" },
    { title: "Total Credits", value: 0, icon: "💳" },
    { title: "User Rating", value: "N/A", icon: "⭐" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiURL}/api/v1/admin/metrics`,
          config
        );
        const metricsData = response.data;

        // Calculate total stats from the response
        const totalUsers = metricsData.data.length;
        const totalSessions = metricsData.count.total_session_count;
        const totalPrompts = metricsData.count.total_prompt_count;
        const totalCreditsUsed = metricsData.count.total_credits_used;
        const totalCreditsAvailable = metricsData.count.total_credits_available;

        // Update stats state
        setStats([
          { title: "Total Users", value: totalUsers, icon: "👤" },
          { title: "Total Sessions", value: totalSessions, icon: "📅" },
          { title: "Report Issues", value: 0, icon: "📝" }, // Placeholder for now
          { title: "Total Prompts", value: totalPrompts, icon: "💬" },
          {
            title: "Total Credits",
            value: `${totalCreditsUsed}/${totalCreditsAvailable}`,
            icon: "💳",
          },
          { title: "User Rating", value: "N/A", icon: "⭐" }, // Placeholder for rating
        ]);

        setData(metricsData.data);
      } catch (error) {
        console.error(error);
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    fetchData();
  }, [addAlert, config]);

  return (
    <>
      <div className="adminpanel__stats--section">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
