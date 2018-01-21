const router = require('express').Router();
const {Book} = require('../../models/book');
const {Trade} = require('../../models/trade');
const authenticate = require('../../middlewares/authenticate');

router.get('/', (req, res) => Book.find({}).populate('owner')
  .then(books => res.status(200).json(books))
  .catch(error => res.status(500).json({}))
);

router.post('/', authenticate, (req, res) => {
  if (req.body && req.body.name) {
    Book.findOne({name: req.body.name, owner: req.user._id})
      .then(book => {
        if (book) res.status(400).json({});
        else Book.create({
          name: req.body.name,
          owner: req.user._id
        })
          .then(book => res.status(200).json({}))
          .catch(error => res.status(500).json({}));
      })
      .catch(error => res.status(500).json({}));
  } else res.status(400).json({});
});

router.delete('/:bookId', authenticate, (req, res) => {
  if (req.params.bookId) {
    Book.findOne({_id: req.params.bookId})
      .then(book => {
        if (book) {
          if (book.owner === req.user._id)
            book.remove()
              .then(() => {
                Trade.remove({book: req.params.bookId})
                  .then(() => res.status(200).json({}))
                  .catch(error => res.status(500).json({}))
              })
              .catch(error => res.status(500).json({}));
          else res.status(403).json({});
        }
        else res.status(400).json({});
      })
      .catch(error => res.status(500).json({}));
  } else res.stsus(400).json({});
});
module.exports = router;
