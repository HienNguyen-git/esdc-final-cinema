require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressHandlebars = require('express-handlebars');

var indexRouter = require('./routes/index.route');
var accountRouter = require('./routes/account.route');
var adminRouter = require('./routes/admin.route');
var bookingRouter = require('./routes/booking.route')
var app = express();
const moment = require('moment')

const bodyParser = require('body-parser'); // xử form dữ liệu
const { convertNumToLetter } = require('./config/helper');
app.use(bodyParser.urlencoded({ extended: false })); //form

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
  helpers: {
    checkPath(routerPath, navPath, options) {
      const fnTrue = options.fn,
        fnFalse = options.inverse;
      // console.log(routerPath, navPath)
      return routerPath === navPath ? fnTrue(this) : fnFalse(this)
    },
    checkPage(routerPath, options) {
      const fnTrue = options.fn,
        fnFalse = options.inverse;
      const headerPageList = ['not-header']
      return !headerPageList.includes(routerPath) ? fnTrue(this) : fnFalse(this)
    },
    checkLength(arr, options) {
      const fnTrue = options.fn,
        fnFalse = options.inverse;
      return arr.length > 0 ? fnTrue(this) : fnFalse(this)
    },
    forLoop(n, a, option) {
      let result = '';
      let optionalParameter = +a
      for (var i = 0; i < n; ++i)
        result += option.fn(i + optionalParameter);
      return result;
    },
    NumToText(n) {
      return convertNumToLetter(n)
    },
    isInArray(arr, n,options) {
      console.log(n)
      console.log(arr)
      const fnTrue = options.fn,
        fnFalse = options.inverse;
      return arr.includes(n)?fnTrue(this):fnFalse(this)
    },
    formatDate(date){
      return moment(date).format("MMM Do YY")
    },
    printValue(value){
      return value
    },
    getSeatLength(seat){
      console.log(seat)
      return 0
    }
  }
}))
app.set('view engine', 'handlebars');

app.use(require('cookie-parser')("This is code secret code"))
app.use(require('express-session')({
  secret: "This is some secret code",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: !true }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs',express.static(path.join(__dirname, 'docs')));


// Flash message
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash
  next()
})

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next()
})


app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/admin', adminRouter);
app.use('/booking', bookingRouter)

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

module.exports = app;
