const firebase = require('firebase');
const express = require('express');
const router = express.Router();
const config = require('../.env');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000", "http://robjmitch.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

firebase.initializeApp(config);

// `index` Renders the index route. Mostly used for setting up CORS and
// initializing Firebase.
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
