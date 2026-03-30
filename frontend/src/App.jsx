import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useState } from "react";
import WordForm from "./components/WordForm.jsx";
import GuessList from "./components/GuessList.jsx";

function App() {
  const [guesses, setGuesses] = useState([

  ]);

  return(
    <main className="app">
      <GuessList guesses={guesses} />
      <WordForm onGuessWord={(text) => { // TODO: byt ut till API-call
        const newGuess = {
          id: crypto.randomUUID(),
          word: text
        };
        setGuesses([...guesses, newGuess])
      }} />
    </main>
  );
}

export default App;