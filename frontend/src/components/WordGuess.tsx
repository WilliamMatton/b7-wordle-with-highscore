import type { FC } from "react";

import type { guess } from "../types.js";
import Letter from "./Letter.js";

type Props = {
  guess : guess;
}

const WordGuess : FC<Props> = ({ guess }) => {
  const word = guess.word;
  const evaluation = guess.evaluation;

  const letters = [];

  for(let i = 0; i < word.length; i++) {
    const letter = {
      id: crypto.randomUUID(),
      letter: word[i]!,
      grade: evaluation[i]!.result
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

export default WordGuess;