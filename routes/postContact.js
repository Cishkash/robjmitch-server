const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  return firebase.database().ref().child('contact').push({
    contactName: req.body.contactName,
    message: req.body.contactMessage
  }).then(
    () => {
      res.status(200).send({message: 'Good job... you, person'})
    }
  ).catch( (err) => {
    res.status(err.status).send(err.message);
  });
});

module.exports = router;
