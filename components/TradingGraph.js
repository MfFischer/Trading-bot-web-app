'use client';  // Add this line at the top

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TradingGraph = ({ data, options }) => {
  return (
    <div>
      <h2>Trading Graph</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TradingGraph;
