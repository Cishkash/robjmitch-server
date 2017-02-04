const firebase = require('firebase');
const express = require('express');
const router = express.Router();
const config = require('../.env');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

firebase.initializeApp(config);

// Testing firebase integration
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
