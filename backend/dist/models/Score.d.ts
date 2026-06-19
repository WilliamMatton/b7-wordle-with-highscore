import mongoose from 'mongoose';
declare const Score: mongoose.Model<{
    guesses: string[];
    username?: string | null;
    time?: number | null;
    options?: {
        wordLength?: number | null;
        repeatLetters?: boolean | null;
    } | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    guesses: string[];
    username?: string | null;
    time?: number | null;
    options?: {
        wordLength?: number | null;
        repeatLetters?: boolean | null;
    } | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    guesses: string[];
    username?: string | null;
    time?: number | null;
    options?: {
        wordLength?: number | null;
        repeatLetters?: boolean | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    guesses: string[];
    username?: string | null;
    time?: number | null;
    options?: {
        wordLength?: number | null;
        repeatLetters?: boolean | null;
    } | null;
}, mongoose.Document<unknown, {}, {
    guesses: string[];
    username?: string | null;
    time?: number | null;
    options?: {
        wordLength?: number | null;
        repeatLetters?: boolean | null;
    } | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    guesses: string[];
    username?: string | null;
    time?: number | null;
    options?: {
        wordLength?: number | null;
        repeatLetters?: boolean | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    guesses: string[];
    username?: string | null;
    time?: number | null;
    options?: {
        wordLength?: number | null;
        repeatLetters?: boolean | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    guesses: string[];
    username?: string | null;
    time?: number | null;
    options?: {
        wordLength?: number | null;
        repeatLetters?: boolean | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Score;
//# sourceMappingURL=Score.d.ts.map