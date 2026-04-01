export default function Letter({ letter }) {
  const classes = `letterItem ${letter.grade}`
  
  return (
    <li className={classes}>
      <p className="guessLetter">{letter.letter}</p>
    </li>
  );
}