import { useState } from "react";

export default function OptionsForm({ onSubmitOptions }) {
  const [length, setLength] = useState(0);
  const [repeat, setRepeat] = useState('true');

  return (
    <form className="optionsForm" onSubmit={(ev) => {
      ev.preventDefault();
      onSubmitOptions(length, repeat);
    }}>
      <div className="optionsFormSection1">
        <label htmlFor="lengthInput" className="optionsFormLabel">Word length</label>
        <input className="optionsFormTextField" name="lengthInput" type="number" min={0} value={length} onChange={(event) => setLength(event.target.value)} />
      </div>
      <div className="optionsFormSection2">
        <input className="optionsFormCheckbox" name="repeatInput" type="checkbox" value={repeat} onChange={(event) => setRepeat(event.target.value)} checked />
        <label htmlFor="repeatInput" className="optionsFormLabel">Word includes repeating letters</label>
      </div>
      <button className="optionsFormSubmitButton" type="submit">Start Game</button>
    </form>
  );
}