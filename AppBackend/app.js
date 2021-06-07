var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createStudentRouter = require('./routes/createStudent');
var getStudentRouter = require('./routes/getStudent');
var getAllStudentRouter = require('./routes/getAllStudent');
var editStudentRouter = require('./routes/editStudent');
var uploadImageRouter = require('./routes/image_upload');
var loginRouter = require('./routes/login');
var delRouter = require('./routes/deleteStudent');
var authenticateRouter = require('./routes/authenticate');
var mailRouter = require('./routes/forgotPass');
var resetPassRouter = require('./routes/resetPass');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insert',createStudentRouter);
app.use('/getstudent',getStudentRouter);
app.use('/getallstudents',getAllStudentRouter);
app.use('/editstudent',editStudentRouter);
app.use('/uploadimage',uploadImageRouter);
app.use('/login',loginRouter);
app.use('/delete',delRouter);
app.use('/authenticate',authenticateRouter);
app.use('/sendmail',mailRouter);
app.use('/resetpass',resetPassRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
