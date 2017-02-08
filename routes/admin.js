const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res, next) {
  function invalidResponse(message) {
    this.message = message;
    this.statusCode = 500;
  }

  firebase.auth().signInWithEmailAndPassword(req.query.email, req.query.password).then(
    (response) => {
      // Handle a successful request (200) with an unsuccessful login
      if (response.code) {
        throw new Error(response.message);
      }
      // Handle successful login
      res.send({
        message: "You were successfully logged in!",
        success: true
      });
    }, (err) => {
      res.status(500).send(err);
    }
  )
});

router.get('/logout', function(req, res, next) {
  firebase.auth().signout().then(
    () => {
      res.send('Signout was successful!');
    }, (err) => {
      res.send(err);
    }
  );
});

router.get('/addPost', function(req, res, next) {
  const timestamp = new Date();

  function writeBlogrData(title, image, body, id, author) {
    // Firebase doesn't automatically send a response with set so we create one
    return new Promise( (resolve, reject) => {
      let postBlog = firebase.database().ref('posts/').set({
        title: title,
        image: image,
        body: id
      });
      if (postBlog) {
        resolve();
      } else {
        reject();
      }
    });
  }

  // These are just test parameters
  writeBlogData().then(
    // Resolved `.set()`
    () => {
      res.send('Success');
    // Rejected `.set()`
    }, (err) => {
      res.send('Blog post failed:', err);
    }
  );
});

module.exports = router;
