import express from 'express';
import fs from 'fs/promises'
import mongoose from 'mongoose';

import wordAPI from '../api/wordAPI.js';
import Score from '../src/models/Score.js';

export default function initializeApp() {
  const app = express();
  app.set('view engine', 'pug');
  app.set('views', 'views');

  app.use(express.json());

  app.get('/', async(req, res) => {
    const html = await fs.readFile('../frontend/dist/index.html');
    res.send(html.toString());
  });

  app.get('/leaderboard', async(req, res) => {
    await mongoose.connect('mongodb://localhost:27017/wordle');
    const scores = await Score.find();

    res.render(
      'leaderboard',
      { 
        title: 'Leaderboard',
        scoreData: scores
      }
    );
  });

  app.get('/api/words', async(req, res) => {
    try {
      const { length, repeat } = req.query;
      const word = await wordAPI.getWord(length, repeat);
      res.status(200).send(word);
    }
    catch(error) {
      res.status(400).json({ error: error.message });
    }
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

  app.get('/api/scores', async(req, res) => {
    await mongoose.connect('mongodb://localhost:27017/wordle');
    const scores = await Score.find();
    res.json(scores);
  });

  app.post('/api/scores', async(req, res) => {
    try {
      await mongoose.connect('mongodb://localhost:27017/wordle');
      const score = new Score({
        username: req.body.username,
        time: req.body.time,
        guesses: req.body.guesses,
        options: req.body.options
      });
      await score.save();

      res.status(201).json(score);
    }
    catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use('/static', express.static('./static'));

  app.use('/assets', express.static('../frontend/dist/assets'));

  return app;
}