import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "./Chart.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartComponent = ({ chartData, chartOptions }) => {
  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
