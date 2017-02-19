const firebase = require('firebase');
const express = require('express');
const router = express.Router();
/**
 * `deleteBlog/:blog_id` Dynamic route for deleting the unique id of objects
 * belonging to the `blogs` and `posts` objects in firebase.
 *
 * @route deleteBlog/:blog_id
 */
router.get('/:blog_id', function(req, res, next) {
  const user = firebase.auth().currentUser;
  // Peek user to ensure authentication.
  if (user) {
    // Send the request to remove from blogs object
    firebase.database().ref('blogs/' + req.params.blog_id).remove().then(
      (response) => {
        // Send the request to remove from posts object
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
