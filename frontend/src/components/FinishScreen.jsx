import ErrorMsg from "./ErrorMsg.jsx";

import { useState, useEffect } from "react";

export default function FinishScreen({ guesses, gameWord, gameWin, finishTime, scorePosted, scorePosting, errorMsg, onSubmitScore, onRestart }) {
  const [winText, setWinText] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if(gameWin)
      setWinText(`Congratulations! The word was \'${gameWord}\', and you guessed it in ${guesses.length} ${guesses.length > 1 ? 'guesses!' : 'guess!'}`);
    else
      setWinText(`Better luck next time! You ran out of guesses. The word was \'${gameWord}\'`);
  }, [gameWin]);
  
  return(
    <div className={gameWin ? "finishScreenLong" : "finishScreenShort"}>
      <div className="finishScreenContent">
        <p className="finishScreenLine1">{winText}</p>
        
        {(gameWin && !scorePosted) && (
          <>
          <p className="finishScreenLine2">Your time was {finishTime} seconds. Do you want to post your score on the global leaderboard?</p>
          
          {scorePosting && (
            <p className="finishScreenLine2">Posting score...</p>
          )}
          
          {errorMsg.length > 0 && (
            <ErrorMsg msg={errorMsg} />
          )}
          
          {!scorePosting && (
            <form className="finishScreenScoreForm" onSubmit={(ev) => {
              ev.preventDefault();
              onSubmitScore(username);
              setUsername('');
            }}>
              <input className="finishScreenScoreInput" name="scoreInput" type="text" placeholder="John Doe" value={username} onChange={(event) => setUsername(event.target.value)} required />
              <button className="finishScreenScoreButton" type="submit">Post Score</button>
            </form>
          )}
          </>
        )}

        {scorePosted && (
          <p className="finishScreenPostedText">Score Posted! Be sure to check it out on the leaderboard.</p>
        )}

        <p className="finishScreenLine3">Do you want to play again?</p>
        <button className="finishScreenRestartButton" onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}