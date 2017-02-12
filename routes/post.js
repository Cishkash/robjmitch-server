const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/:post_id', function(req, res, next) {
  firebase.database().ref('posts/' + req.params.post_id).once('value').then(
    (post) => {
      if (post && post.val() !== null) {
        res.send(post.val());
      } else if (post.val() === null) {
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
