import express from 'express';
import fs from 'fs/promises'
import wordAPI from '../api/wordAPI.js';

export default function initializeApp() {
  const app = express();

  /*
  API routes går via /api/resurs !
  */

  app.get('/', async(req, res) => {
    const html = await fs.readFile('../frontend/dist/index.html');
    res.send(html.toString());
  });

  app.get('/api/words', async(req, res) => {
    const { length, repeat } = req.query;
    const word = await wordAPI.getWord(!length ? 0 : length, !repeat ? true : false);
    res.status(200).send(word);
  });

  app.use('/assets', express.static('../frontend/dist/assets'));

  return app;
}