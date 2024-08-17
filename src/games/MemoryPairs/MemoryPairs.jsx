import React, { useState, useEffect } from 'react';
import './MemoryPairs.css';
import SnackbarComponent from '../../components/SnackbarComponent';

import cardsData from '../../assets/Json/memoryPairs.json'

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const MemoryPairs = ({score,setScore,endGame}) => {
    const [cards, setCards] = useState(() => shuffleArray([...cardsData, ...cardsData]));
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matched, setMatched] = useState([]);
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



    const handleCardClick = (index) => {
        if (flippedIndices.length === 2 || flippedIndices.includes(index) || matched.includes(cards[index].id)) {
            return;
        }

        setFlippedIndices((prev) => [...prev, index]);
    };

    const isGameComplete = cards.every(card => matched.includes(card.id));
    useEffect(() => {
      if (isGameComplete)
        return endGame()
      else
        return 
      }, [isGameComplete])
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

        </div>
    );
};

export default MemoryPairs;
