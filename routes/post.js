const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/:post_id', function(req, res, next) {
  function fetchPost() {
    const fetchPost = firebase.database().ref('posts/' + req.params.post_id);
    return new Promise( (resolve, reject) => {
      fetchPost.on('value', (post) => {
        if (post) {
          resolve(post.val());
        } else {
          reject();
        }
      });
    });
  }

  fetchPost().then(
    (post) => {
      res.send(post);
    }, (err) => {
      res.status(404).send(err);
    }
  )
});

module.exports = router;
