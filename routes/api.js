const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  router.use('/admin', require('./routes/admin'));
  router.use('/addArticle', require('./routes/addArticle'));
  router.use('/articles', require('./routes/articles'));
  router.use('/blogs', require('./routes/blogs'));
  router.use('/deleteBlog', require('./routes/deleteBlog'));
  router.use('/post', require('./routes/post'));
});

module.exports = router;
