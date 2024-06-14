'use client';  // Add this line at the top

import { useState, useEffect } from 'react';
import sentimentService from '../services/sentimentService';

const SentimentAnalysis = ({ ticker }) => {
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const data = await sentimentService.getSentiment(ticker);
        setSentiment(data);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();
  }, [ticker]);

  if (loading) {
    return <p>Loading sentiment analysis...</p>;
  }

  return (
    <div>
      <h2>Sentiment Analysis for {ticker}</h2>
      <p>Sentiment: {sentiment?.sentiment}</p>
    </div>
  );
};

export default SentimentAnalysis;
