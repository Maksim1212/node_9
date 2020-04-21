import * as mongoose from 'mongoose';

export interface IUser  extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isAdmin: boolean,
    verified: boolean,
}