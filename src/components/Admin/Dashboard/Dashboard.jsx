import React, { useEffect, useState } from "react";
import axios from "../../../api/axios.js";
import StatCard from "../Graphs/StatCard/StatCard";
import { useAlert } from "../../../context/AlertContext";
import { FaStar } from "react-icons/fa";

const Dashboard = () => {
  const { addAlert } = useAlert();
  const [feedback, setFeedback] = useState([]);
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
        const response = await axios.get("/metrics/all");
        const metricsData = response.data;

        // Calculate total stats from the response
        const totalUsers = metricsData.data.length;
        const totalSessions = metricsData.count.total_session_count;
        const totalPrompts = metricsData.count.total_prompt_count;
        const totalCreditsUsed = metricsData.count.total_credits_used;
        const totalCreditsAvailable = metricsData.count.total_credits_available;
        const userRating = metricsData.count.overall_average_rating;

        // Update stats state
        setStats([
          { title: "Total Users", value: totalUsers, icon: "👤" },
          { title: "Total Sessions", value: totalSessions, icon: "📅" },
          { title: "Report Issues", value: 0, icon: "📝" },
          { title: "Total Prompts", value: totalPrompts, icon: "💬" },
          {
            title: "Total Credits",
            value: `${totalCreditsUsed}/${totalCreditsAvailable}`,
            icon: "💳",
          },
          { title: "User Rating", value: userRating, icon: "⭐" },
        ]);
      } catch (error) {
        console.error(error);
        addAlert(
          error.response ? error.response.data.message : error.message,
          "error",
          "bottom_right"
        );
      }
    };

    const fetchFeedback = async () => {
      try {
        const feedbackResponse = await axios.get("/feedback");
        setFeedback(feedbackResponse.data.data);
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
    fetchFeedback();
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

      <div className="adminpanel__feedback--section">
        <div className="adminpanel__feedback--title">Feedback</div>
        <div className="adminpanel__feedback--content">
          {feedback.length > 0 ? (
            feedback
              .filter(
                (item) => item.feedback_text && item.feedback_text.trim() !== ""
              )
              .map((item, index) => (
                <div key={index} className="adminpanel__feedback--item">
                  <div className="adminpanel__feedback--username">
                    <span>{item.username}</span>
                    <span className="adminpanel__feedback--rating">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="adminpanel__feedback--star"
                        />
                      ))}{" "}
                    </span>
                  </div>
                  <div className="adminpanel__feedback--text">
                    {item.feedback_text}
                  </div>
                </div>
              ))
          ) : (
            <div className="adminpanel__feedback--no">
              No feedback available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
