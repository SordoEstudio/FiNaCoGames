// src/components/Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ onTimeUp }) => {
  const [time, setTime] = useState(60); // Temporizador de 60 segundos

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [onTimeUp]);

  return <div>Tiempo restante: {time} segundos</div>;
};

export default Timer;
