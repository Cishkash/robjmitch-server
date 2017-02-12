const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.post('/login', function(req, res, next) {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(
    (response) => {
      // Handle successful login
      res.send({
        message: "You were successfully logged in!",
        success: true
      });
    }
  ).catch( (err) => {
    res.status(err.status).send(err.message);
  })
});

router.get('/logout', function(req, res, next) {
  firebase.auth().signOut().then(
    (response) => {
      res.send({ message: 'Log out successful'});
    }, (err) => {
      throw new Error();
    }
  ).catch( (err) => {
    res.status(500).send(err);
  });
});

router.get('/currentuser', function(req, res, next) {
  const user = firebase.auth().currentUser;
  if (user) {
    res.status(200).send({ message: 'User is signed in' });
  } else if (user === null) {
    res.status(404).send ({ message: 'User is not logged in.' });
  } else {
    res.status(500).send({ message: 'Failed to find a user' })
  }
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
