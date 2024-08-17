import React, { useEffect, useState } from "react";
import "./MatchingPairs.css"
import SnackbarComponent from "../../components/SnackbarComponent";
import matchingPAirsData  from '../../assets/Json/matchingPairs.json'
export default function PairMatchGame({score,setScore,endGame}) {
  const [selections, setSelections] = useState([]);
  const [snackbarProps, setSnackbarProps] = useState({type:"",message:"",open:false,duration:1500,vertical:"bottom",horizontal:"center"});

  const [pairs, setPairs] = useState(matchingPAirsData);

  const [message, setMessage] = useState("");
  const [highlighted, setHighlighted] = useState(null); // Nuevo estado para destacar la primera carta seleccionada

  const handleSelection = (id, group) => {
    const selectedPair = pairs.find((pair) => pair.id === id);

    // Si ya está seleccionada, no hacer nada
    if (selectedPair.selected) return;

    // Si ya hay una selección previa
    if (selections.length === 1) {
      const [prevSelection] = selections;
      const prevPair = pairs.find((pair) => pair.id === prevSelection.id);

      // Comprobar si el par es correcto
      if (prevPair.matchId === id) {
        setSnackbarProps({...snackbarProps,type:"success",message:"Correcto!",open:true});
        setScore(score +1)
        setPairs((prevPairs) =>
          prevPairs.map((pair) =>
            pair.id === id || pair.id === prevPair.id
              ? { ...pair, selected: true }
              : pair
          )
        );
        setHighlighted(null); // Limpiar resaltado
      } else {
        setSnackbarProps({...snackbarProps,type:"error",message:"Incorrecto",open:true});
        setSelections([]); // Reiniciar selección en caso de error
        setHighlighted(null); // Limpiar resaltado
        return;
      }
      setSelections([]); // Reiniciar las selecciones para un nuevo par
    } else {
      setSelections([{ id, group }]);
      setHighlighted(id); // Resaltar la carta seleccionada
      setMessage(""); // Limpiar mensaje
    }
  };

  const isGameComplete = pairs.every((pair) => pair.selected);
  useEffect(() => {
    if (isGameComplete)
      return endGame()
    else
      return 
    }, [isGameComplete])
  return (
    <div className="pair-match-game">
      <div className="group-a">
        {pairs.filter(pair => pair.group === 'A').map(pair => (
          <div
            key={pair.id}
            className={`pair-item ${pair.selected ? "selected" : ""} ${highlighted === pair.id ? "highlighted" : ""}`}
            onClick={() => handleSelection(pair.id, 'A')}
          >
            {pair.content}
          </div>
        ))}
      </div>
      <div className="message">{message}</div>
      <SnackbarComponent snackbarProps={snackbarProps} setSnackbarProps={setSnackbarProps} />
      <div className="group-b">
        {pairs.filter(pair => pair.group === 'B').map(pair => (
          <div
            key={pair.id}
            className={`pair-item ${pair.selected ? "selected" : ""} ${highlighted === pair.id ? "highlighted" : ""}`}
            onClick={() => handleSelection(pair.id, 'B')}
          >
            {pair.content}
          </div>
        ))}
      </div>
    </div>
  );
}
