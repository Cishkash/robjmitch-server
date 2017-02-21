const firebase = require('firebase');
const express = require('express');
const router = express.Router();
/**
 * `deleteBlog/:blog_id` Dynamic route for deleting the unique id of objects
 * belonging to the `blogs` and `posts` objects in firebase.
 *
 * @NOTE These blogs and posts objects cannot entirely work without each other
 *       being present. Handling the deletion consecutively may not entirely be
 *       the best route to go here without validating one of them is deleted
 *       first. Then this begs the question how do you renege once one of these
 *       promises fail to remove. Not the responsibility of the back end here
 *       just thinking out loud.
 *
 * @route deleteBlog/:blog_id
 */
router.get('/:blog_id', function(req, res, next) {
  const user = firebase.auth().currentUser;
  // Peek user to ensure authentication.
  if (user) {

    Promise.all([
      firebase.database().ref('blogs/' + req.params.blog_id).remove(),
      firebase.database().ref('posts/' + req.params.blog_id).remove()
    ]).then(
      () => {
        res.status(200).send({
          message: 'Blog was successfully removed'
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
