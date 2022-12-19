const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    nameBook: { type: String, required: true },
    page: { type: Number },
    publicationDate: { type: Date },
  }
);

const Book = mongoose.model('book', bookSchema)

module.exports = Book