const firebase = require('firebase');
const express = require('express');
const router = express.Router();

/**
 * `/updatePost` will post an update to firebase
 */
router.post('/', function(req, res, next) {
  const user = firebase.auth().currentUser;
  // Peek user to ensure authentication.
  if (user) {
    Promise.all([
      firebase.database().ref('blogs/' + req.body.blog_id).update({
        title: req.body.title
      }),
      firebase.database().ref('posts/' + req.body.blog_id).update({
        body: req.body.body,
        title: req.body.title,
        author: req.body.author
      })
    ]).then(
      () => {
        res.status(200).send({
          message: 'Blog was successfully updated'
        });
      }
    ).catch(
      (err) => {
        res.status(500).send({
          err
        });
      }
    )
  }
});

module.exports = router;
