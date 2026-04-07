export default function OptionsForm({ settings, onSettingsChange, onSubmitOptions }) {
  return (
    <form className="optionsForm" onSubmit={(ev) => {
      ev.preventDefault();
      onSubmitOptions();
    }}>
      <div className="optionsFormSection1">
        <label htmlFor="lengthInput" className="optionsFormLabel">Word length (0 for random)</label>
        <input className="optionsFormTextField" name="lengthInput" type="number" min={0} value={settings.length} onChange={(event) => onSettingsChange({ ...settings, length: event.target.value })} />
      </div>
      <div className="optionsFormSection2">
        <input className="optionsFormCheckbox" name="repeatInput" type="checkbox" checked={settings.repeat} onChange={(event) => onSettingsChange({ ...settings, repeat: event.target.checked })} />
        <label htmlFor="repeatInput" className="optionsFormLabel">Word includes repeating letters</label>
      </div>
      <button className="optionsFormSubmitButton" type="submit">Start Game</button>
    </form>
  );
}