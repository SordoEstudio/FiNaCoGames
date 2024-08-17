// src/pages/GameRules.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import gameDescriptions from '../assets/Json/GamesDescriptions.json'
const GameRules = () => {
  const { game } = useParams();
  const navigate = useNavigate();



  return (
    <div>
{/*       <h1>Reglas del Juego</h1>
 */}      <h1>Reglas para: {game.replace('-', ' ').toUpperCase()}</h1>

      <p>{gameDescriptions[game]}</p>
      <button onClick={() => navigate(`/play/${game}`)}>Comenzar</button>
      <button onClick={() => navigate(-1)}>Volver</button>
      </div>
  );
};

export default GameRules;
