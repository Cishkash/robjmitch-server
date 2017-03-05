const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  firebase.database().ref('articles').once('value').then(
    (articles) => {
      if (articles && articles.val()) {
        res.status(200).send(articles.val());
      } else if (articles.val() === null) {
        throw {
          status: 404,
          message: new Error()
        }
      } else {
        throw {
          status: 500,
          message: new Error()
        }
      }
    }
  ).catch( (err) => {
    res.status(err.status).send(err.message);
  });
});

module.exports = router;
