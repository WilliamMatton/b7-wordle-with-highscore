import { useState, type FC } from "react";
import type { onGuessWord } from "../types.js";

type Props = {
  wordLength : number;
  onGuessWord : onGuessWord;
}

const WordForm : FC<Props> = ({ wordLength, onGuessWord }) => {
  const [text, setText] = useState('');

  return (
    <form className="wordForm" onSubmit={(ev) => {
      ev.preventDefault();
      onGuessWord(text);
      setText('');
    }}>
      <input
        className="wordFormInput"
        name="wordInput"
        type="text"
        minLength={wordLength}
        maxLength={wordLength}
        value={text}
        onChange={(event) =>
          setText(event.target.value)
        }
      />
      <button className="wordFormSubmitButton" type="submit">OK</button>
    </form>
  );
}

export default WordForm;