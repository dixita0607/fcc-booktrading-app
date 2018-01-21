const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  requester: {
    type: String,
    required: true,
    ref: 'User'
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
});

module.exports = {
  Trade: mongoose.model('Trade', TradeSchema)
};
