import React, { useState, useEffect } from 'react';
import questions from "../../assets/questions.json";
import SnackbarComponent from '../../components/SnackbarComponent';

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [snackbarProps, setSnackbarProps] = useState({type:null,message:"",open:false,duration:6000});
  const [timeLeft, setTimeLeft] = useState(60); // Tiempo total en segundos (por ejemplo, 60 segundos)
  const [questionsPool, setQuestionsPool] = useState([...questions]);

  useEffect(() => {
    getNextQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCurrentQuestion(null); // Se termina el tiempo, se termina el juego
    }
  }, [timeLeft]);

  const getNextQuestion = () => {
    if (questionsPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * questionsPool.length);
      setCurrentQuestion(questionsPool[randomIndex]);
      setQuestionsPool(questionsPool.filter((_, index) => index !== randomIndex));
      setSnackbarProps({...snackbarProps,open:false})
    } else {
      setCurrentQuestion(null); // No más preguntas disponibles
    }
  };

  const handleAnswer = (selectedOption) => {
    if (!currentQuestion) return;

    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
      setSnackbarProps({type:"success",message:"Respuesta correcta!",open:true,duration:1500});
    } else {
      setSnackbarProps({type:"error",message:"Respuesta incorrecta",open:true,duration:1500});
    }

    setTimeout(() => {
      getNextQuestion();
      
    }, 1000);
  };

  return (
    <div className="app">
      {timeLeft > 0 ? (
        currentQuestion ? (
          <div>
            <h2>{currentQuestion.question}</h2>
            <ul>
              {currentQuestion.options.map((option, index) => (
                <li key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </li>
              ))}
            </ul>
            <div>Tiempo restante: {timeLeft} segundos</div>
            <SnackbarComponent snackbarProps={snackbarProps} setSnackbarProps={setSnackbarProps}/>
          </div>
        ) : (
          <h2>No hay más preguntas disponibles. Puntuación: {score}</h2>
        )
      ) : (
        <h2>Tiempo agotado. Puntuación final: {score}</h2>
      )}
    </div>
  );
};

export default Questions;
