'use client';

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import { Line, Bar, Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import styles from '../../styles/Dashboard.module.css';
import { convertToHeikenAshi } from '../../utils/heikenAshi';

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [heikenAshiData, setHeikenAshiData] = useState({
    labels: [],
    datasets: [],
  });
  const [sentimentData, setSentimentData] = useState({
    labels: [],
    datasets: [],
  });
  const [volumeData, setVolumeData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch data from backend
    fetchBalance();
    fetchTransactions();
    fetchCandlestickData();
    fetchSentimentData();
    fetchVolumeData();
  }, []);

  const fetchBalance = async () => {
    const response = await fetch('/api/alpaca/balance');
    const data = await response.json();
    setBalance(data.balance);
  };

  const fetchTransactions = async () => {
    const response = await fetch('/api/alpaca/transactions');
    const data = await response.json();
    setTransactions(data.transactions);
  };

  const fetchCandlestickData = async () => {
    const response = await fetch('/api/alpaca/candlestick');
    const data = await response.json();
    const heikenAshi = convertToHeikenAshi(data);
    setHeikenAshiData({
      labels: heikenAshi.map(entry => entry.x),
      datasets: [
        {
          label: 'Heiken Ashi',
          data: heikenAshi.map(entry => ({
            x: entry.x,
            y: [entry.haOpen, entry.haHigh, entry.haLow, entry.haClose],
          })),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  const fetchSentimentData = async () => {
    const response = await fetch('/api/sentiment');
    const data = await response.json();
    setSentimentData({
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Sentiment Analysis',
          data: data.map(entry => entry.sentiment),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
      ],
    });
  };

  const fetchVolumeData = async () => {
    const response = await fetch('/api/alpaca/volume');
    const data = await response.json();
    setVolumeData({
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Volume Data',
          data: data.map(entry => entry.volume),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        <h2>Current Balance</h2>
        <p>${balance}</p>
      </div>
      <div className={styles.graphs}>
        <h2>Trading Analysis</h2>
        <div className={styles.chartContainer}>
          <h3>Heiken Ashi Candlestick Chart</h3>
          <Chart type="candlestick" data={heikenAshiData} />
        </div>
        <div className={styles.chartContainer}>
          <h3>Sentiment Analysis</h3>
          <Line data={sentimentData} />
        </div>
        <div className={styles.chartContainer}>
          <h3>Volume Chart</h3>
          <Bar data={volumeData} />
        </div>
      </div>
      <div className={styles.explanation}>
        <h2>Analysis Explanation</h2>
        <p>Here you can find a detailed explanation of the trends observed in the graphs above...</p>
      </div>
      <div className={styles.transactions}>
        <h2>Recent Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
