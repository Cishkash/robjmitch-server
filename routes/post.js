const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/:post_id', function(req, res, next) {
  function fetchPost() {
    var fetchPost = firebase.database().ref('post/' + req.params.post_id);
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
    post => {
      res.send(post);
    }, () => {
      res.send('Failed');
    }
  )
});

module.exports = router;
