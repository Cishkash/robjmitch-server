const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res, next) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch( (err) => {
    res.send(err.code, err.message);
  });
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
  const
  
  function writeUserData(userId, name, email, imageUrl) {
    // Firebase doesn't automatically send a response with set so we create one
    return new Promise( (resolve, reject) => {
      let postUser = firebase.auth().database().ref('posts/').set({
        name: name,
        email: email,
        image: imageUrl
      });
      if (postUser) {
        resolve();
      } else {
        reject();
      }
    });
  }

  // These are just test parameters
  writeUserData().then(
    // Resolved `.set()`
    () => {
      res.send('Posted!');
    // Rejected `.set()`
    }, (ex) => {
      res.send('postUser failed:', ex);
    }
  );
});

module.exports = router;
