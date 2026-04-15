export type guess = { id : string, word : string, evaluation : { letter : string, result : string }[] };

export type letter = { id : string, letter : string, grade : string };

export type settings = { length : number, repeat : boolean };

export type onSettingsChange = (settings : { length : number, repeat : boolean }) => void;

export type onSubmitScore = (username : string) => void;

export type onGuessWord = (text : string) => void;