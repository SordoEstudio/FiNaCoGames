// src/pages/GamePlay.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from '../components/Timer';
import Score from '../components/Score';
import Timeline from '../games/Timeline/TimeLine.jsx';
import Questions from '../games/Questions/Questions.jsx';
import MatchingPairs from '../games/MatchingPairs/MatchingPairs.jsx';
import MemoryPairs from '../games/MemoryPairs/MemoryPairs.jsx';
import TimeLineMUI from '../games/Timeline/TimelineMUI.jsx';

const GamePlay = () => {
  const { game } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  // Función para renderizar el juego correspondiente
  const renderGame = () => {
    switch (game) {
      case 'timeline':
        return <TimeLineMUI score={score} setScore={setScore} endGame={endGame}/>;
      case 'questions':
        return <Questions score={score} setScore={setScore}/>;
      case 'memory-pairs':
        return <MemoryPairs endGame={endGame} score={score} setScore={setScore}timer={timer} setTimer={setTimer}/>;
      case 'matching-pairs':
        return <MatchingPairs score={score} setScore={setScore}endGame={endGame}/>;
      // Agrega más casos para otros juegos aquí
      default:
        return <p>Juego no encontrado.</p>;
    }
  };
  // Lógica del juego y actualizaciones de puntaje...

  const endGame = () => {
    navigate(`/results/${game}`, { state: { score: score, time: timer } });
  };

  return (
    <div>
      <h1>Jugando: {game}</h1>
      <Timer onTimeUp={endGame} />
      <Score score={score} />
      {renderGame()}
      <button onClick={endGame}>Abandonar</button>
    </div>
  );
};

export default GamePlay;
