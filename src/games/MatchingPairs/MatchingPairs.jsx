import React, { useEffect, useState } from "react";
import "./MatchingPairs.css"
import SnackbarComponent from "../../components/SnackbarComponent";

export default function PairMatchGame({score,setScore,endGame}) {
  const [selections, setSelections] = useState([]);
  const [snackbarProps, setSnackbarProps] = useState({type:"",message:"",open:false,duration:1500,vertical:"bottom",horizontal:"center"});

  const [pairs, setPairs] = useState([
    { id: 1, group: "A", content: "A1", matchId: 5, selected: false },
    { id: 2, group: "A", content: "A2", matchId: 6, selected: false },
    { id: 3, group: "A", content: "A3", matchId: 7, selected: false },
    { id: 4, group: "A", content: "A4", matchId: 8, selected: false },
    { id: 5, group: "B", content: "B1", matchId: 1, selected: false },
    { id: 6, group: "B", content: "B2", matchId: 2, selected: false },
    { id: 7, group: "B", content: "B3", matchId: 3, selected: false },
    { id: 8, group: "B", content: "B4", matchId: 4, selected: false },
  ]);

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
