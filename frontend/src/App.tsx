import { useState, type FC } from "react";

import type { guess } from "./types.js";
import Header from "./components/Header.js";
import OptionsForm from "./components/OptionsForm.js";
import WordForm from "./components/WordForm.js";
import GuessList from "./components/GuessList.js";
import GuessCounter from "./components/GuessCounter.js";
import FinishScreen from "./components/FinishScreen.js";

const App : FC = () => {
  const [gameActive, setGameActive] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [finishTime, setFinishTime] = useState(0);

  const [gameID, setGameID] = useState(null);
  const [guesses, setGuesses] = useState<guess[]>([]);
  const [settings, setSettings] = useState({ length: 0, repeat: false });

  const [scorePosting, setScorePosting] = useState(false);
  const [scorePosted, setScorePosted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmitOptions() {
    const response = await fetch(`/api/games?length=${settings.length}&repeat=${settings.repeat}`, {
      method: 'POST'
    });
  
    if(response.status === 400) {
      setErrorMsg('No words found with given settings!');
      return;
    }
    else if(!response.ok) {
      setErrorMsg('Server error! try again later');
      return;
    }

    const gameSession = await response.json();
    setErrorMsg('');
    setGameID(gameSession.sessionID);
    setGameActive(true);
  }

  async function onGuessWord(text : string) {
    const response = await fetch(`/api/games/${gameID}/guesses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guess: text })
    });
    const gameData = await response.json();

    const newGuess = {
      id: crypto.randomUUID(),
      word: text,
      evaluation: gameData.evaluation
    };
    
    setGuesses([...guesses, newGuess]);

    if(gameData.gameWin) {
      setGameFinished(true);
      setGameWin(true);
      setFinishTime(gameData.finishTime);
      setGameActive(false);
    }

    if(guesses.length >= 5 && !gameData.gameWin) {
      setGameFinished(true);
      setGameWin(false);
      setFinishTime(gameData.finishTime);
      setGameActive(false);
    }
  }

  async function onSubmitScore(username : string) {
    setScorePosting(true);
    setErrorMsg('');
    const score = {
      username: username,
      time: finishTime,
      guesses: guesses.map((guess) => guess.word),
      options: {
        wordLength: settings.length,
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

    setGameID(null);
    setGuesses([]);
    setSettings({ length: 0, repeat: false });
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