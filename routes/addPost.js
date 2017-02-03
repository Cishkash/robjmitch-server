const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  function writeUserData(userId, name, email, imageUrl) {
    // Firebase doesn't automatically send a response with set so we create one
    return new Promise( (resolve, reject) => {
      let postUser = firebase.database().ref('users/' + userId).set({
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
  writeUserData(120, 'Robby', 'robjmitch@derp.com', 'kitty').then(
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
