import WordGuess from "./WordGuess.jsx";

export default function GuessList({ guesses }) {
  return (
    <ul className="guessList">
      {guesses.map((guess) => {
        return(
          <WordGuess guess={guess} key={guess.id} />
        );
      })}
    </ul>
  );
}