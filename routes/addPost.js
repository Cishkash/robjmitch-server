const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  function writeUserData(userId, name, email, imageUrl) {
    // Firebase doesn't automatically send a response with set so we create one
    return new Promise( (resolve, reject) => {
      let postUser = firebase.database().ref('posts/').set({
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
