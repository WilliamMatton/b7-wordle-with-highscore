import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useState } from "react";
import { Activity } from "react";
import OptionsForm from "./components/OptionsForm.jsx";
import WordForm from "./components/WordForm.jsx";
import GuessList from "./components/GuessList.jsx";

function App() {
  const [guesses, setGuesses] = useState([]);

  const [optionsSubmitted, setOptionsSubmitted] = useState(false);

  return(
    <main className="app">
      <Activity mode={optionsSubmitted ? 'hidden' : 'visible'}>
        <OptionsForm onSubmitOptions={(length, repeat) => {
          console.log('You got the word!');
          // API-call för att hämta ordet här!
          setOptionsSubmitted(true);
        }} />
      </Activity>
      <Activity mode={optionsSubmitted ? 'visible' : 'hidden'}>
        <GuessList guesses={guesses} />
        <WordForm onGuessWord={(text) => { // TODO: byt ut till API-call
          const newGuess = {
            id: crypto.randomUUID(),
            word: text
          };
          setGuesses([...guesses, newGuess])
        }} />
      </Activity>
    </main>
  );
}

export default App;