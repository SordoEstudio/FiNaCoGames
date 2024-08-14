import React, { useState, useEffect } from 'react';
import './MemoryPairs.css';
import SnackbarComponent from '../../components/SnackbarComponent';

const cardsData = [
    { id: 1, front: 'img/cardterminal.jpg', text: 'Terminal', bgColor: '#f94144' }, 
    { id: 2, front: 'img/cardterminal.png', text: 'Texto 2', bgColor: '#f3722c' },
    { id: 3, front: 'img/cardterminal.png', text: 'Texto 3', bgColor: '#f8961e' },
    { id: 4, front: 'img/cardterminal.png', text: 'Texto 4', bgColor: '#f9844a' },
    { id: 5, front: 'img/cardterminal.png', text: 'Texto 5', bgColor: '#f9c74f' },
    { id: 6, front: 'img/cardterminal.png', text: 'Texto 6', bgColor: '#90be6d' },
    { id: 7, front: 'img/cardterminal.png', text: 'Texto 7', bgColor: '#43aa8b' },
    { id: 8, front: 'img/cardterminal.png', text: 'Texto 8', bgColor: '#577590' }
];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const MemoryPairs = ({score,setScore}) => {
    const [cards, setCards] = useState(() => shuffleArray([...cardsData, ...cardsData]));
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matched, setMatched] = useState([]);
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [snackbarProps, setSnackbarProps] = useState({type:"",message:"",open:false,duration:1500,vertical:"bottom",horizontal:"center"});

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            const isMatch = cards[firstIndex].id === cards[secondIndex].id;

            if (isMatch) {
                setMatched((prev) => [...prev, cards[firstIndex].id]);
                setScore( score + 1);
                setSnackbarProps({...snackbarProps,type:"success",message:"Respuesta correcta",open:true,duration:1500});

            }

            setTimeout(() => {
                setFlippedIndices([]);
                setSnackbarProps({...snackbarProps,open:false})
            }, 1000);
        }
    }, [flippedIndices]);

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                setTimer(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [startTime]);

    const handleCardClick = (index) => {
        if (flippedIndices.length === 2 || flippedIndices.includes(index) || matched.includes(cards[index].id)) {
            return;
        }

        if (!startTime) {
            setStartTime(Date.now());
        }

        setFlippedIndices((prev) => [...prev, index]);
    };

    const allMatched = cards.every(card => matched.includes(card.id));

    return (
        <div className="game-container">

            <div id="gameBoard" className="game-board">
                {cards.map((card, index) => {
                    const isFlipped = flippedIndices.includes(index) || matched.includes(card.id);
                    return (
                        <div
                        key={index}
                        className={`card ${isFlipped ? 'flip' : ''}`}
                        onClick={() => handleCardClick(index)}
                        >
                            <div className="front" style={{ backgroundColor: card.bgColor }}>
                                <img src={card.front} alt={card.text} className="card-image" />
                                <div className="card-text">{card.text}</div>
                            </div>
                            <div className="back"></div>
                        </div>
                    );
                })}
            </div>
                <SnackbarComponent snackbarProps={snackbarProps} setSnackbarProps={setSnackbarProps}/>
            {allMatched && (
                <div className="modal">
                    <h2>¡Felicidades!</h2>
                    <p>Has completado el juego en {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}</p>
                    <button onClick={() => window.location.href = '/'}>Volver al inicio</button>
                </div>
            )}
        </div>
    );
};

export default MemoryPairs;
