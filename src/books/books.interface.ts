import * as mongoose from 'mongoose';

export interface IBook  extends mongoose.Document {
    id: string;
    blogpost: number;
    title: string;
    author: string;
    published: {
        publisher: string,
        year: number,
    };
}