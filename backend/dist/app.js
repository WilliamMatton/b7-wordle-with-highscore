import express from 'express';
import fs from 'fs/promises';
import mongoose, { Error } from 'mongoose';
import wordAPI from './api/wordAPI.js';
import Score from './models/Score.js';
export default function initializeApp() {
    const app = express();
    app.set('view engine', 'pug');
    app.set('views', 'views');
    app.use(express.json());
    const GAME_SESSIONS = [];
    const DB_URL = process.env.DB_URL;
    app.get('/', async (req, res) => {
        const html = await fs.readFile('../frontend/dist/index.html');
        res.send(html.toString());
    });
    app.post('/api/games', async (req, res) => {
        try {
            const { length, repeat } = req.query;
            const word = await wordAPI.getWord(length ? parseInt(length) : 0, repeat === 'true');
            const gameSession = {
                gameWord: word,
                guesses: [],
                sessionID: crypto.randomUUID(),
                startTime: Date.now()
            };
            GAME_SESSIONS.push(gameSession);
            res.status(201).json({ sessionID: gameSession.sessionID });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({ error: message });
        }
    });
    app.post('/api/games/:id/guesses', async (req, res) => {
        const gameSession = GAME_SESSIONS.find((session) => session.sessionID == req.params.id);
        if (gameSession) {
            const guess = req.body.guess;
            gameSession.guesses.push(guess);
            const evaluation = await wordAPI.evaluateGuess(guess, gameSession.gameWord);
            const correct = guess === gameSession.gameWord;
            if (evaluation === false)
                res.send('Invalid call to /api/evaluateGuess, the guessed word must be the same length as the answer.');
            if (correct) {
                const finishTime = parseFloat(((Date.now() - gameSession.startTime) / 1000).toFixed(1));
                res.status(201).json({
                    guesses: gameSession.guesses,
                    evaluation: evaluation,
                    finishTime: finishTime,
                    gameWin: true
                });
            }
            else {
                res.status(201).json({
                    guesses: gameSession.guesses,
                    evaluation: evaluation,
                    gameWin: false
                });
            }
        }
        else
            res.status(404);
    });
    app.get('/leaderboard', async (req, res) => {
        await mongoose.connect(DB_URL);
        const scores = await Score.find();
        res.render('leaderboard', {
            title: 'Leaderboard',
            scoreData: scores
        });
    });
    app.get('/api/scores', async (req, res) => {
        await mongoose.connect(DB_URL);
        const scores = await Score.find();
        res.json(scores);
    });
    app.post('/api/scores', async (req, res) => {
        try {
            await mongoose.connect(DB_URL);
            const score = new Score({
                username: req.body.username,
                time: req.body.time,
                guesses: req.body.guesses,
                options: req.body.options
            });
            await score.save();
            res.status(201).json(score);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ error: message });
        }
    });
    app.use('/static', express.static('./static'));
    app.use('/assets', express.static('../frontend/dist/assets'));
    return app;
}
//# sourceMappingURL=app.js.map