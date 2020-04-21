import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName:{ type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: {type: Boolean, required: true},
    verified: {type: Boolean, required: true},
});