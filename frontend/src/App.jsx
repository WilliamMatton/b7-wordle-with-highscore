import { useState, Activity } from "react";

import Header from "./components/Header.jsx";
import OptionsForm from "./components/OptionsForm.jsx";
import WordForm from "./components/WordForm.jsx";
import GuessList from "./components/GuessList.jsx";
import GuessCounter from "./components/GuessCounter.jsx";
import FinishScreen from "./components/FinishScreen.jsx";

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  const [gameWord, setGameWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [settings, setSettings] = useState({ length: 0, repeat: false });
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);

  const [scorePosting, setScorePosting] = useState(false);
  const [scorePosted, setScorePosted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  return(
    <>
      <Header />
      <main className="app">
        <Activity mode={gameActive || gameFinished ? 'hidden' : 'visible'}>
          <OptionsForm settings={settings} onSettingsChange={setSettings} onSubmitOptions={async() => {
            const response = await fetch(`/api/words?length=${settings.length}&repeat=${settings.repeat}`);
            if(response.status === 400) {
              setErrorMsg('No words found with given settings!');
              return;
            }
            else if(!response.ok) {
              setErrorMsg('Server error! try again later');
              return;
            }

            const word = await response.text();
            console.log(`The word is: ${word}`);
            setErrorMsg('');
            setGameWord(word);
            setStartTime(Date.now());
            setGameActive(true);
          }} />
        </Activity>
        <Activity mode={gameActive ? 'visible' : 'hidden'}>
          <GuessList guesses={guesses} />
          <WordForm wordLength={settings.length} onGuessWord={async(text) => {
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

            const elapsedSeconds = parseFloat(((Date.now() - startTime) / 1000).toFixed(1));

            if(correct) {
              setGameFinished(true);
              setGameWin(true);
              setFinishTime(elapsedSeconds);
              setGameActive(false);
              console.log(`Word found in ${elapsedSeconds} seconds.`);
            }

            if(guesses.length >= 5 && !correct) {
              setGameFinished(true);
              setGameWin(false);
              setFinishTime(elapsedSeconds);
              setGameActive(false);
              console.log(`Game ended in ${elapsedSeconds} seconds.`);
            }
          }} />
          <GuessCounter guesses={guesses} />
        </Activity>
        <Activity mode={gameFinished ? 'visible' : 'hidden'}>
          <FinishScreen guesses={guesses} gameWord={gameWord} gameWin={gameWin} finishTime={finishTime} scorePosted={scorePosted} scorePosting={scorePosting} onSubmitScore={async(username) => {
            setScorePosting(true);
            setErrorMsg('');
            const score = {
              username: username,
              time: finishTime,
              guesses: guesses.map((guess) => guess.word),
              options: {
                wordLength: gameWord.length,
                repeatLetters: settings.repeat
              }
            };
            
            const response = await fetch('/api/scores', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(score),
            });

            setScorePosting(false);
            if(!response.ok) {
              setErrorMsg('Could not connect to database! Try again later');
              return;
            }

            setScorePosted(true);
          }}
          onRestart={() => {
            setGameActive(false);
            setGameFinished(false);
            setGameWin(false);

            setGameWord('');
            setGuesses([]);
            setSettings({ length: 0, repeat: false });
            setStartTime(0);
            setFinishTime(0);

            setScorePosting(false);
            setScorePosted(false);

            setErrorMsg('');
          }} />
        </Activity>
        <Activity mode={errorMsg.length === 0 ? 'hidden' : 'visible'}>
          <small className="optionsError">{errorMsg}</small>
        </Activity>
      </main>
    </>
  );
}

export default App;