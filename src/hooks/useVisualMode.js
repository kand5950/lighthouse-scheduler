import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //an array of modes

  const transition = (newMode, replace = false) => {
    setMode(newMode)

    if (replace){
                            //[FIRST, SECOND]   =>     [FIRST]   => [FIRST, THIRD]        
      setHistory(history => [...history.slice(0, history.length -1), newMode]); 
    } else {                
      setHistory(history => [...history, newMode])}; //adds newMode to history [initial, newMode]
    };
  
    const back = () => {

    if (history.length === 1) return; //doesnt allow user to go past initial mode
    setHistory(history => history.slice(0, history.length -1)); //makes a new history without last index
    setMode(history[history.length-2]); //sets the mode to the previous item in history array

  };

  return {
    mode,
    transition,
    back
  }
}