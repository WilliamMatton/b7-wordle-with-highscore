import express from 'express';
import fs from 'fs/promises'
import wordAPI from '../api/wordAPI.js';

export default function initializeApp() {
  const app = express();

  app.get('/', async(req, res) => {
    const html = await fs.readFile('../frontend/dist/index.html');
    res.send(html.toString());
  });

  app.get('/api/words', async(req, res) => {
    const { length, repeat } = req.query;
    const word = await wordAPI.getWord(length, repeat);
    res.status(200).send(word);
  });

  app.get('/api/evaluateGuess', async(req, res) => {
    const { guess, answer } = req.query;
    if(!guess || !answer)
      res.send(`Invalid call to /api/evaluateGuess, format is: /api/evaluateGuess?guess='yourGuess'&answer='yourAnswer'`);
    else {
      const evaluation = await wordAPI.evaluateGuess(guess, answer);
      if(evaluation === false)
        res.send('Invalid call to /api/evaluateGuess, the guessed word must be the same length as the answer.');
      else
        res.status(200).json({ evaluation: evaluation });
    }
  });

  app.use('/assets', express.static('../frontend/dist/assets'));

  return app;
}