import { useState } from "react";
import { useEffect } from "react";

export default function FinishScreen({ guesses, gameWord, gameWin, onRestart }) {
  const [winText, setWinText] = useState('');

  useEffect(() => {
    if(gameWin)
      setWinText(`Congratulations! The word was \'${gameWord}\', and you guessed it in ${guesses.length} ${guesses.length > 1 ? 'guesses!' : 'guess!'}`);
    else
      setWinText(`Better luck next time! You ran out of guesses. The word was \'${gameWord}\'`);
  }, [gameWin]);
  
  return(
    <div className="finishScreen">
      <div className="finishScreenContent">
        <p className="finishScreenLine1">{winText}</p>
        <p className="finishScreenLine2">Do you want to play again?</p>
        <button className="finishScreenRestartButton" onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}