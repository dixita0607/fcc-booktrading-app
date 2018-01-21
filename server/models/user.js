const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  }
});

module.exports = {
  User: mongoose.model('User', UserSchema)
};
