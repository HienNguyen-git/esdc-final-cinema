var express = require('express');
var router = express.Router();

const { loginGet, loginPost, registerGet, registerPost } = require('../controller/account.controller');
const { registerValidator, loginValidator } = require('../validation/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/homeee', { title: 'DashBoard',path: "not-header",isAdmin: true ,layout:'admin', routerPath: ''});
});

router.get('/bookings', function(req, res, next) {
  res.render('admin/bookings', { title: 'Bookings',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/bookings' });
});

router.get('/movies', function(req, res, next) {
  res.render('admin/movies', { title: 'Movies',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/movies' });
});

router.get('/hall', function(req, res, next) {
  res.render('admin/hall', { title: 'Hall',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/hall' });
});

router.get('/employee', function(req, res, next) {
  res.render('admin/employee', { title: 'Employee',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/employee' });
});

router.get('/login', loginGet);

router.post('/login', loginValidator, loginPost)

module.exports = router;
