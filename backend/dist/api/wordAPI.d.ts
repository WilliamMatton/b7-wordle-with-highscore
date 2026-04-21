declare function getWord(length?: number, repeat?: boolean): Promise<string | undefined>;
declare function evaluateGuess(guessedWord: string, correctWord: string): Promise<false | {
    letter: string | undefined;
    result: string;
}[]>;
declare const wordAPI: {
    getWord: typeof getWord;
    evaluateGuess: typeof evaluateGuess;
};
export default wordAPI;
//# sourceMappingURL=wordAPI.d.ts.map