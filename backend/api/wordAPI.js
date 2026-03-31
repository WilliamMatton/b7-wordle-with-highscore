import fs from 'fs';

async function getWord(length = 0, repeat = true) {
  const lines = fs.readFileSync('./api/words.txt', 'utf-8')
    .split('\n')
    .map(word => word.trim());

  const matches = lines.filter(word =>
    (length > 0 ? word.length == length : true) &&
    (repeat === false || repeat === "false" ? new Set(word).size == word.length : true)
  );
  if(matches.length === 0) throw new Error(`No words found`);

  return matches[Math.floor(Math.random() * matches.length)];
}

const wordAPI = {
  getWord
};

export default wordAPI;