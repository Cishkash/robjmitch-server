const firebase = require('firebase');
const express = require('express');
const router = express.Router();
const config = require('../.env');

firebase.initializeApp(config);

// Testing firebase integration
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
