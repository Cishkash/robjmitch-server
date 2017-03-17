const firebase = require('firebase');
const express = require('express');
const router = express.Router();
const config = require('../.env');

router.use(function(req, res, next) {
  // Setup CORS for multiple domains
  const allowedOrigins = ['http://localhost:3000', 'http://robjmitch.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

firebase.initializeApp(config);

// `index` Renders the index route. Mostly used for setting up CORS and
// initializing Firebase.
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
