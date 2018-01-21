const router = require('express').Router();
const {Trade} = require('../../models/trade');
const {Book} = require('../../models/book');
const {User} = require('../../models/user');
const authenticate = require('../../middlewares/authenticate');

router.get('/', authenticate, (req, res) => {
  Trade.find({
    $or: [
      {owner: req.user.username},
      {requester: req.user.username}
    ]
  })
    .populate('requester')
    .populate({path: 'book', populate: {path: 'owner'}})
    .then(trades => {
      if (trades) res.status(200).json(trades);
      else res.status(404).json({});
    })
    .catch(error => res.status(500).json({}));
});

router.post('/', authenticate, (req, res) => {
  if (req.body && req.body.bookId) {
    Book.findOne({_id: req.body.bookId})
      .then(book => {
        if (book && book.owner !== req.user._id) {
          Trade.findOne({book: book._id, requester: req.user._id})
            .then(trade => {
              if (trade) res.status(409).json({});
              else Trade.create({
                requester: req.user._id,
                book: req.body.bookId
              })
                .then(trade => res.status(200).json({}))
                .catch(error => res.status(500).json({}));
            })
            .catch(error => res.status(500).json({}));
        }
        else res.status(400).json({});
      })
      .catch(error => res.status(500).json({}));
  } else res.status(400).json({});
});

router.put('/:tradeId', authenticate, (req, res) => {
  if (req.params.tradeId && req.body.status) {
    Trade.findOne({_id: req.params.tradeId}).populate('book')
      .then(trade => {
        if (trade && trade.book.owner === req.user._id)
          Trade.update({_id: req.params.tradeId}, {status: req.body.status})
            .then(() => res.status(200).json({}))
            .catch(error => res.status(500).json({}));
        else res.status(400).json({});
      })
      .catch(error => res.status(500).json({}));
  }
});

module.exports = router;
