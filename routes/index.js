const firebase = require('firebase');
const express = require('express');
const router = express.Router();
const config = require('../.env');

firebase.initializeApp(config);

// `index` Renders the index route. Mostly used for setting up CORS and
// initializing Firebase.
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
