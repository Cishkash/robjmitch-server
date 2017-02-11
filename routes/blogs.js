const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  function fetchBlogs() {
    var fetchBlogs = firebase.database().ref('blogs/');
    return new Promise( (resolve, reject) => {
      fetchBlogs.on('value', (blogs) => {
        if (blogs && blogs.val() !== null) {
          resolve(blogs.val());
        } else if (blogs.val() === null) {
          reject(404);
        } else {
          reject(500);
        }
      });
    });
  }

  fetchBlogs().then(
    blogs => {
      res.send(blogs);
    }, (err) => {
      if (err === 404) {
        res.status(err).send({message: 'Could not find blog entries'});
      } else {
        res.status(err).send({message: 'Failed to fetch blog entries'});
      }
    }
  )
});

module.exports = router;
