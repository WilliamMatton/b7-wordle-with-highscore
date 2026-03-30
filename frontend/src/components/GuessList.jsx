import WordGuess from "./WordGuess.jsx";

export default function GuessList({ guesses }) {
  return (
    <ul className="guessList">
      {guesses.map((guess) => {
        return(
          <WordGuess word={guess} />
        );
      })}
    </ul>
  );
}