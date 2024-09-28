import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../Graphs/StatCard/StatCard";
import ChartComponent from "../Graphs/Chart/Chart";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Users", value: 1200, icon: "👤" },
    { title: "Sessions", value: 450, icon: "📅" },
    { title: "Coupons Used", value: 78, icon: "🎟️" },
    { title: "Emails Sent", value: 320, icon: "📧" },
  ]);

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sessions",
        data: [50, 60, 70, 80, 90, 100],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/admin/metrics");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      <div className="adminpanel__charts--section">
        <ChartComponent chartData={chartData} chartOptions={chartOptions} />
      </div>
    </>
  );
};

export default Dashboard;
