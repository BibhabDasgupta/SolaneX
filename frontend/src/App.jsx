import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import BuyForm from './components/BuyForm';
import solanaIcon from './assets/icons8-solana.svg';
import './App.css';

const App = () => {
  const [totalSolana, setTotalSolana] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 200;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="app-container">
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
      <div className="total-solana">
        <img src={solanaIcon} alt="Solana Icon" className="solana-icon" />
        <span>{totalSolana} SOL</span>
      </div>
      <h1 className="app-title">BUY SOLANA</h1>
      <div className="content-container">
        <Chart />
        <BuyForm totalSolana={totalSolana} setTotalSolana={setTotalSolana} />
      </div>
    </div>
  );
};

export default App;
