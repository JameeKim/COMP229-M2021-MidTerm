/**
 * Server/Models/books.ts
 *
 * The model for the book data
 *
 * Dohyun Kim 301058465
 * COMP229-M2021-MidTerm-301058465
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

/**
 * The structure of the book document
 */
interface Model {
  Title: string;
  Description?: string;
  Price: number;
  Author: string;
  Genre: string;
}

// create a model class
const BookSchema = new Schema<Model, mongoose.Model<Model>, Model>
({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

const Model = mongoose.model('Book', BookSchema);
export default Model;
