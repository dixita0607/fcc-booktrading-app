const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true,
    ref: 'User'
  }
});

module.exports = {
  Book: mongoose.model('Book', BookSchema)
};
