const router = require('express').Router();
const passport = require('passport');

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.use('/books', require('./books'));
router.use('/trades', require('./trades'));
router.use('/user', require('./user'));

module.exports = router;
