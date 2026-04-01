import Letter from "./Letter.jsx";

export default function WordGuess({ guess }) {
  const word = guess.word;
  const evaluation = guess.evaluation;

  const letters = [];

  for(let i = 0; i < word.length; i++) {
    const letter = {
      id: crypto.randomUUID(),
      letter: word[i],
      grade: evaluation[i].result
    }
    letters[i] = letter;
  }

  return (
    <ul className="guessLetters">
      {letters.map((letter) => {
        return (
          <Letter letter={letter} key={letter.id} />
        );
      })}
    </ul>
  );
}