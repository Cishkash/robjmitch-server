const firebase = require('firebase');
const express = require('express');
const router = express.Router();

/**
 * addArticle route. Allows a user to add an intesting article to the blog.
 *
 * @route addArticle
 */
router.post('/', function(req, res, next) {
  const articleLink = req.body.articleLink;
  const articleTitle = req.body.articleTitle;
  const user = firebase.auth().currentUser;

  if (user) {
    return firebase.database().ref().child('articles').push({
      title: articleTitle,
      articleLink: articleLink
    }).then(
      () => {
        res.status(200).send({message: 'Article posted'});
      }
    ).catch(
      (err) => {
        res.status(500).send(err);
      }
    );
  }
});

module.exports = router;
