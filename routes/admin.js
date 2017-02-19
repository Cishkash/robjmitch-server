const firebase = require('firebase');
const express = require('express');
const router = express.Router();

/**
 * `admin/login` route. Responsible for authenticating a user via email/password
 * to Firebase.
 *
 * @route admin/login
 */
router.post('/login', function(req, res, next) {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(
    (response) => {
      res.status(200).send(response);
    }
  ).catch(
    (err) => {
      res.status(404).send(err);
    }
  );
});
/**
 * `admin/logout` route. Responsible for returning a user to a public
 * unauthenticated user.
 *
 * @route admin/logout
 */
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

/**
 * `admin/currentUser` After logged in, allows the application to peek at a user
 * to validated if a user is able to access authenticated routes on the front
 * end and is used to double check authentication before a user is allowed to
 * modify firebase data.
 *
 * @route admin/currentuser
 */
router.get('/currentuser', function(req, res, next) {
  const user = firebase.auth().currentUser;
  // Peek user and send authenticated message to the front end
  if (user) {
    res.status(200).send({ message: 'User is signed in' });
  } else if (user === null) {
    res.status(401).send ({ message: 'You are not authorized' });
  } else {
    res.status(500).send({ message: 'Failed to find a user' })
  }
});

/**
 * `admin/addblog` Allows a user to post a blog and blog post to Firebase given
 * they are already authenticated.
 *
 * @route admin/addblog
 */
router.post('/addblog', function(req, res, next) {
  const title = req.body.title;
  const user = firebase.auth().currentUser;
  // Peek user for authentication
  if (user) {
    // Will write the blog data to the `blogs` object in Firebase.
    function writeBlogData() {
      const blogBody = req.body.blogBody;

      // Push a blogs entry
      firebase.database().ref().child('blogs').push({
        body: blogBody,
        image: '/images/ribby.jpg',
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

    // Posts a blog post article when a blog has been written.
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
  } else {
    res.status(401).send({ message: "Invalid user"})
  }
});

module.exports = router;
