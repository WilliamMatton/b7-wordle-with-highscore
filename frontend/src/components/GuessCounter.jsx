import { useEffect } from 'react';

export default function GuessCounter({ guesses, onLastGuess }) {
  let guessCount = guesses.length;
  let remaining =  6 - guessCount;

  useEffect(() => {
    if(remaining <= 0) {
      onLastGuess();
    }
  }, [guesses, onLastGuess]);

  return (
    <small className="wordGuessCounter">Guesses Remaining: {remaining}</small>
  );
}