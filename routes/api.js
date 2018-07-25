const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  // Setup CORS for multiple domains
  const allowedOrigins = ['http://localhost:3000', 'http://robjmitch.com', 'http://localhost:9000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

router.use('/admin', require('./admin'));
router.use('/addArticle', require('./addArticle'));
router.use('/articles', require('./articles'));
router.use('/blogs', require('./blogs'));
router.use('/deleteBlog', require('./deleteBlog'));
router.use('/post', require('./post'));
router.use('/updatePost', require('./updatePost'));
router.use('/postContact', require('./postContact'));


module.exports = router;
