const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  function fetchBlogs() {
    var fetchBlogs = firebase.database().ref('blogs/');
    return new Promise( (resolve, reject) => {
      fetchBlogs.on('value', (blogs) => {
        if (blogs) {
          resolve(blogs.val());
        } else {
          reject();
        }
      });
    });
  }

  fetchBlogs().then(
    blogs => {
      res.send(blogs);
    }, () => {
      res.send('Failed');
    }
  )
});

module.exports = router;
