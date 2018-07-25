const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  firebase.database().ref().child('contact').push({
    contactName: req.body.contactName,
    message: req.body.contactMessage
  }).then(
    contact => {
      res.send({status: 200, message: 'Good job... you, person'})
    }
  ).catch( (err) => {
    res.status(err.status).send(err.message);
  });
});

module.exports = router;
