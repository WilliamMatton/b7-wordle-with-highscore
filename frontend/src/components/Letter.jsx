export default function Letter({ letter }) {
  return (
    <li className="letterItem">
      <p className="guessLetter">{letter.letter}</p>
    </li>
  );
}