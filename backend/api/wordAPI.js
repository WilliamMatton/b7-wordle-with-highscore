import fs from 'fs';

async function getWord(length, repeat) {
  let word = await fetchWord();

  if(length > 0) {
    while (word.length != length) {
      word = await fetchWord();
    }
  }
  
  return word;
}

async function fetchWord() {
  const lines = fs.readFileSync('./api/words.txt', 'utf-8').split('\n');
  const lineIndex = Math.floor(Math.random() * 10000);
  if(lineIndex >= lines.length) throw new Error(`Line ${lineIndex} not found`);
  return lines[lineIndex].trim();
}

const wordAPI = {
  getWord
};

export default wordAPI;