import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useState } from "react";
import { Activity } from "react";
import OptionsForm from "./components/OptionsForm.jsx";
import WordForm from "./components/WordForm.jsx";
import GuessList from "./components/GuessList.jsx";
import GuessCounter from "./components/GuessCounter.jsx";
import FinishScreen from "./components/FinishScreen.jsx";

function App() {
  const [guesses, setGuesses] = useState([]);

  const [gameActive, setGameActive] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  const [gameWord, setGameWord] = useState('');

  return(
    <main className="app">
      <Activity mode={gameActive || gameFinished ? 'hidden' : 'visible'}>
        <OptionsForm onSubmitOptions={async(length, repeat) => {
          const response = await fetch(`/api/words?length=${length}&repeat=${repeat}`);
          const word = await response.text();
          console.log(`The word is: ${word}`);
          setGameWord(word);
          setGameActive(true);
        }} />
      </Activity>
      <Activity mode={gameActive ? 'visible' : 'hidden'}>
        <GuessList guesses={guesses} />
        <WordForm onGuessWord={async(text) => {
          const response = await fetch(`/api/evaluateGuess?guess=${text}&answer=${gameWord}`);
          const evaluation = await response.json();
          const newGuess = {
            id: crypto.randomUUID(),
            word: text,
            evaluation: evaluation.evaluation
          };
          const correct = newGuess.evaluation.filter((letter) =>
            letter.result === 'correct').length === newGuess.evaluation.length;

          setGuesses([...guesses, newGuess]);

          if(correct) {
            setGameFinished(true);
            setGameWin(true);
            setGameActive(false);
          }
        }} />
        <GuessCounter guesses={guesses} onLastGuess={() => {
          setGameFinished(true);
          setGameActive(false);
        }} />
      </Activity>
      <Activity mode={gameFinished ? 'visible' : 'hidden'}>
        <FinishScreen guesses={guesses} gameWord={gameWord} gameWin={gameWin} onRestart={() => {
          // TODO: fixa så att det går att starta om!
        }} />
      </Activity>
    </main>
  );
}

export default App;