import { useState } from "react";

export default function WordForm({ wordLength, onGuessWord }) {
  const [text, setText] = useState('');

  return (
    <form className="wordForm" onSubmit={(ev) => {
      ev.preventDefault();
      onGuessWord(text);
      setText('');
    }}>
      <input className="wordFormInput" name="wordInput" type="text" minLength={wordLength} maxLength={wordLength} value={text} onChange={(event) => setText(event.target.value)} />
      <button className="wordFormSubmitButton" type="submit">OK</button>
    </form>
  );
}