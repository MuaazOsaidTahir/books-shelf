import mongoose, { Schema, model, models } from 'mongoose';

const user = new Schema({
    id: String,
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})


const books = new Schema({
    id: String,
    genre: String,
    title: String,
    author: String,
    status: {
        type: String,
        enum : ['READING','COMPLETED', "PLAN"],
        default: 'PLAN'
    },
    img: {
        type: Buffer
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    published_at: {
        type: String,
    }
})

export const userModel = models.users || mongoose.model('users', user);
export const booksModel = models.books || mongoose.model('books', books);