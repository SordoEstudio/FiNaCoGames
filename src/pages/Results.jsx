// src/pages/Results.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, timer } = location.state || { score: 0, time: '00:00:00' };

  return (
    <div>
      <h1>¡Felicitaciones!</h1>
      <p>Lograste un puntaje de: {score}</p>
      <p>Tiempo: {timer}</p>
      <button onClick={() => navigate('/')}>Volver a Inicio</button>
    </div>
  );
};

export default Results;
