import fs from 'fs';

async function getWord(length = 0, repeat = true) {
  const lines = fs.readFileSync('./api/words.txt', 'utf-8')
    .split('\n')
    .map(word => word.trim());

  const matches = lines.filter(word =>
    (length > 0 ? word.length == length : true) &&
    (repeat === false || repeat === "false" ? new Set(word).size == word.length : true)
  );
  if(matches.length === 0)
    throw new Error('No words found');

  return matches[Math.floor(Math.random() * matches.length)];
}

async function evaluateGuess(guessedWord, correctWord) {
  const guess = guessedWord.trim().toLowerCase();
  const answer = correctWord.trim().toLowerCase();

  const areInputWordsInvalid =
    guess.length !== answer.length ||
    answer.length !== guess.length;
  
  if(areInputWordsInvalid)
      return false;

  const wordLength = answer.length;

  let wordArray = [];
  let frequencyMap = new Map();

  if(guess === answer) {
    for(let i = 0; i < wordLength; i++) {
      wordArray[i] = {letter: guess[i], result: 'correct'};
    }
    return wordArray;
  }

  for(let i = 0; i < wordLength; i++) {
    frequencyMap.set(answer[i], (frequencyMap.get(answer[i]) ?? 0) + 1);
  }

  for(let i = 0; i < wordLength; i++) {
    if(guess[i] === answer[i]) {
      wordArray[i] = {letter: guess[i], result: 'correct'};
      frequencyMap.set(answer[i], frequencyMap.get(answer[i]) - 1);
    }
  }

  for(let i = 0; i < wordLength; i++) {
    if(wordArray[i] !== undefined) continue;
    
    if(answer.includes(guess[i]) && frequencyMap.get(guess[i]) > 0) {
      wordArray[i] = {letter: guess[i], result: 'misplaced'};
      frequencyMap.set(guess[i], frequencyMap.get(guess[i]) - 1);
    }
    else {
      wordArray[i] = {letter: guess[i], result: 'incorrect'};
    }
  }
  return wordArray;
}

const wordAPI = {
  getWord,
  evaluateGuess
};

export default wordAPI;