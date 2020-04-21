import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    blogpost:{ type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    published: {
        publisher: {type: String, required: true},
        year: {type: Number, required: true},
    },
});