import type { FC } from "react";

import type { letter } from "../types.js";

type Props = {
  letter : letter;
}

const Letter : FC<Props> = ({ letter }) => {
  const classes = `letterItem ${letter.grade}`
  
  return (
    <li className={classes}>
      <p className="guessLetter">{letter.letter}</p>
    </li>
  );
}

export default Letter;