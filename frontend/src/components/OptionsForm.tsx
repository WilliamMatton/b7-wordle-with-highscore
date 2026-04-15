import type { FC } from "react";

import type { onSettingsChange, settings } from "../types.js";
import ErrorMsg from "./ErrorMsg.js";

type Props = {
  settings : settings;
  onSettingsChange : onSettingsChange;
  onSubmitOptions : () => void;
  errorMsg : string;
};

const OptionsForm : FC<Props> = ({ settings, onSettingsChange, onSubmitOptions, errorMsg }) => {
  return (
    <form className="optionsForm" onSubmit={(ev) => {
      ev.preventDefault();
      onSubmitOptions();
    }}>
      <div className="optionsFormSection1">
        <label htmlFor="lengthInput" className="optionsFormLabel">Word length (0 for random)</label>
        <input
          className="optionsFormTextField"
          name="lengthInput"
          type="number"
          min={0}
          value={settings.length}
          onChange={(event) =>
            onSettingsChange({
              ...settings,
              length: parseInt(event.target.value)
            })
          }
        />
      </div>
      <div className="optionsFormSection2">
        <input
          className="optionsFormCheckbox"
          name="repeatInput"
          type="checkbox" 
          checked={settings.repeat}
          onChange={(event) =>
            onSettingsChange({
              ...settings,
              repeat: event.target.checked
            })
          }
        />
        <label htmlFor="repeatInput" className="optionsFormLabel">Word includes repeating letters</label>
      </div>

      {errorMsg.length > 0 &&
        <ErrorMsg msg={errorMsg} />    
      }

      <button className="optionsFormSubmitButton" type="submit">Start Game</button>
    </form>
  );
}

export default OptionsForm;