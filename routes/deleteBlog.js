const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/:blog_id', function(req, res, next) {
  const user = firebase.auth().currentUser;
  if (user) {
    firebase.database().ref('blogs/' + req.params.blog_id).remove().then(
      (response) => {
        firebase.database().ref('posts/' + req.params.blog_id).remove().then(
          () => {
            res.status(200).send({
              message: 'Blog was successfully removed'
            });
          }
        ).catch( (err) => {
          res.status(500).send(err);
        });
      }
    ).catch( (err) => {
      res.status(500).send(err);
    });

  } else if (user === null) {
    res.status(404).send ({ message: 'User is not logged in.' });
  } else {
    res.status(500).send({ message: 'Failed to find a user' })
  }
});

module.exports = router;
