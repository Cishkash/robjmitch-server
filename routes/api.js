const firebase = require('firebase');
const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin'));
router.use('/addArticle', require('./addArticle'));
router.use('/articles', require('./articles'));
router.use('/blogs', require('./blogs'));
router.use('/deleteBlog', require('./deleteBlog'));
router.use('/post', require('./post'));

module.exports = router;
