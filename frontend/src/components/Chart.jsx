import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
import './Chart.css';

const Chart = () => {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState('inr'); 
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.4);

  const handleResize = useCallback(() => {
    setChartWidth(window.innerWidth * 0.5);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=${currency}&days=1`);
        setData(result.data.prices.map(price => ({
          time: new Date(price[0]).toLocaleTimeString(),
          price: price[1]
        })));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [currency]);

  return (
    <div className="chart-wrapper">
      <div className="currency-selector-container">
        <label htmlFor="currency-selector" className="currency-label">Select Currency:</label>
        <select
          id="currency-selector"
          className="currency-selector"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
        </select>
      </div>
      <div className="chart-container">
        <LineChart width={chartWidth} height={400} data={data}>
          <Line type="monotone" dataKey="price" stroke="#4A90E2" strokeWidth={2} />
          <CartesianGrid stroke="#E4E4E4" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default Chart;

