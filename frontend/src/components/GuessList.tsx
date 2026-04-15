import type { FC } from "react";

import type { guess } from "../types.js";
import WordGuess from "./WordGuess.js";

type Props = {
  guesses : guess[];
}

const GuessList : FC<Props> = ({ guesses }) => {
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

export default GuessList;