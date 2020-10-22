var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Add new Task controller (week 5)
var tasksRouter = require('./routes/tasks');
var app = express();


//Database Connection - try to connect an log a pass/fail result!
const mongoose = require('mongoose')
const globals = require('./config/globals')
mongoose.connect(globals.db,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true
   }).then(
      (res) =>
      {
         console.log('Connection to MongoDB')
      }).catch (() =>
{
   console.log('Connection Error')
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render('error');
});

// helper method to select the proper value in a drop down list
var hbs = require('hbs')
//*********************
hbs.registerHelper('createOption', (currentValue, selectedValue) => {
   // if the 2 values match, add the text ' selected', otherwise add an empty string
   //var selectedProperty = currentValue === selectedValue ? ' selected' : ''
   var selectedProperty = ''
   if (currentValue === selectedValue) {
      selectedProperty = ' selected'
   }

   return new hbs.SafeString('<option' + selectedProperty + '>' + currentValue + '</option>')
})
//***********************************
module.exports = app;


