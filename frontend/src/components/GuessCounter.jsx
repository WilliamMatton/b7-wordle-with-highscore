export default function GuessCounter({ guesses }) {
  let guessCount = guesses.length;
  let remaining =  6 - guessCount;

  return (
    <small className="wordGuessCounter">Guesses Remaining: {remaining}</small>
  );
}