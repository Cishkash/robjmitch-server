const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  firebase.database().ref('blogs/').once('value').then(
    (blogs) => {
      if (blogs && blogs.val() !== null) {
        console.log('Hit resolve');
        res.send(blogs.val());
      } else if (blogs.val() === null) {
        // @TODO Consider sending this as a 200 as it is not entirely a falsy
        //       value.
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
