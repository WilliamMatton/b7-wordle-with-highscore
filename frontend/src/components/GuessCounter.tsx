import type { FC } from "react";
import type { guess } from "../types.js";

type Props = {
  guesses : guess[];
}

const GuessCounter : FC<Props> = ({ guesses }) => {
  let guessCount = guesses.length;
  let remaining =  6 - guessCount;

  return (
    <small className="wordGuessCounter">Guesses Remaining: {remaining}</small>
  );
}

export default GuessCounter;