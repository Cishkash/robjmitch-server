const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res, next) {
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
  console.log('Logging out');
  firebase.auth().signOut().then(
    (response) => {
      console.log(response);
      // if (response ) throw response
      res.send({ message: 'Log out successful'});
    }, (err) => {
      res.send(err);
    }
  );
});

router.get('/currentuser', function(req, res, next) {
  firebase.auth().onAuthStateChanged( (user) => {
    if (user) {
      res.send({success: true});
    } else {
      res.status(500).send({success: false});
    }
  });
});

router.post('/addblog', function(req, res, next) {
  const timestamp = new Date();

  function writeBlogrData(title, body, timestamp) {
    // Firebase doesn't automatically send a response with set so we create one
    return new Promise( (resolve, reject) => {
      let postBlog = firebase.database().ref('posts/').set({
        body: body,
        image: 'images/ribby.jpg',
        title: title,
        timestamp: timestamp
      });
      if (postBlog) {
        resolve();
      } else {
        reject();
      }
    });
  }

  // These are just test parameters
  writeBlogData(title, body, timestamp).then(
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
