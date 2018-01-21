const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const {User} = require('../../models/user');

router.get('/', (req, res) => {
  if (req.user)
    User.findOne({_id: req.user._id})
      .then(user => {
        if (user) res.status(200).json(user);
        else res.status(404).json({});
      })
      .catch(error => res.status(500).json({}));
  else res.status(400).json({});
});

router.put('/', authenticate, (req, res) => {
  if (req.body && (req.body.fullName || req.body.city || req.body.state)) {
    User.findOneAndUpdate({_id: req.user._id}, {
      fullName: req.body.fullName,
      city: req.body.city,
      state: req.body.state
    })
      .then(user => res.status(200).json({}))
      .catch(error => res.status(500).json({}));
  } else res.status(400).json({});
});

module.exports = router;
