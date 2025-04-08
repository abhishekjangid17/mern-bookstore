const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  image: String, // URL for book image
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Book', bookSchema);
