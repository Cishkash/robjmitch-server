const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  firebase.auth().onAuthStateChanged( user => {
    if (user) {
      res.status(200).send(true)
    } else {
      res.status(200).send(false)
    }
  })
});

module.exports = router;