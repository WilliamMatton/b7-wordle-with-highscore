import { useState } from "react";

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

  async function onSubmitOptions() {
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
  }

  async function onGuessWord(text) {
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
  }

  async function onSubmitScore(username) {
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
  }

  function onRestart() {
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
  }

  return(
    <>
      <Header />
      <main className="app">
        {!(gameActive || gameFinished) && (
          <OptionsForm settings={settings} onSettingsChange={setSettings} onSubmitOptions={onSubmitOptions} errorMsg={errorMsg} />
        )}

        {gameActive &&
          <>
            <GuessList guesses={guesses} />
            <WordForm wordLength={settings.length} onGuessWord={onGuessWord} />
            <GuessCounter guesses={guesses} />
          </>
        }

        {gameFinished &&
          <FinishScreen
            guesses={guesses}
            gameWord={gameWord}
            gameWin={gameWin}
            finishTime={finishTime}
            scorePosted={scorePosted}
            scorePosting={scorePosting}
            errorMsg={errorMsg}
            onSubmitScore={onSubmitScore}
            onRestart={onRestart}
          />
        }
      </main>
    </>
  );
}

export default App;