import express from 'express';
import fs from 'fs/promises'

export default function initializeApp() {
  const app = express();

  /*
  API routes går via /api/resurs !
  */

  app.get('/', async(req, res) => {
    const html = await fs.readFile('../frontend/dist/index.html');
    res.send(html.toString());
  });

  app.use('/assets', express.static('../frontend/dist/assets'));

  return app;
}