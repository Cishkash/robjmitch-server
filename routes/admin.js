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
  const title = req.body.title;

  function writeBlogData() {
    const blogBody = req.body.blogBody;

    // Push a blogs entry
    firebase.database().ref().child('blogs').push({
      body: blogBody,
      image: 'images/ribby.jpg',
      title: title
    }).then( (blogPost) => {
      // When resolved push a posts entry
      writePostData(blogPost.key).then( () => {
        res.send({message: 'Blog posted'})
      }, (err) => {
        res.status(500).send(err);
      });
    }, (err) => {
      res.status(500).send(err);
    });
  }

  // Posts a blog post article
  function writePostData(blogPostKey) {
    const postAuthor = req.body.postAuthor;
    const postBody = req.body.postBody;

    return firebase.database().ref().child('posts/'+ blogPostKey).set({
      body: postBody,
      author: postAuthor,
      title: title
    });
  }

  writeBlogData();
});

module.exports = router;
