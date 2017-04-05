var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes routes and routes
var api = require('./routes/api');
var index = require('./routes/index');
// var addArticle = require('./routes/addArticle');
// var admin = require('./routes/admin');
// var articles = require('./routes/articles');
// var blogs = require('./routes/blogs');
// var deleteBlog = require('./routes/deleteBlog');
// var post = require('./routes/post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
// app.use('/admin', admin);
// app.use('/addArticle', addArticle);
// app.use('/articles', articles);
// app.use('/blogs', blogs);
// app.use('/deleteBlog', deleteBlog);
// app.use('/post', post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
