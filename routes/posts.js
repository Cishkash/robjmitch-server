const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  function fetchUsers() {
    var fetchPosts = firebase.database().ref('posts/');
    return new Promise( (resolve, reject) => {
      fetchPosts.on('value', (posts) => {
        if (posts) {
          resolve(posts.val());
        } else {
          reject();
        }
      });
    });
  }

  fetchUsers().then(
    posts => {
      res.send(posts);
    }, () => {
      res.send('Failed');
    }
  )
});

module.exports = router;
