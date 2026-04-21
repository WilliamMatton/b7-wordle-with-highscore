import mongoose from 'mongoose';
const scoreSchema = new mongoose.Schema({
    username: String,
    time: Number,
    guesses: [String],
    options: {
        wordLength: Number,
        repeatLetters: Boolean
    }
});
const Score = mongoose.model('Score', scoreSchema);
export default Score;
//# sourceMappingURL=Score.js.map