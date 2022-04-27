var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/home', { title: 'Express',path: "not-header",isAdmin: true });
});

router.get('/bookings', function(req, res, next) {
  res.render('admin/bookings', { title: 'Express',path: "not-header",isAdmin: true });
});

router.get('/movies', function(req, res, next) {
  res.render('admin/movies', { title: 'Express',path: "not-header",isAdmin: true });
});

router.get('/hall', function(req, res, next) {
  res.render('admin/hall', { title: 'Express',path: "not-header",isAdmin: true });
});

router.get('/employee', function(req, res, next) {
  res.render('admin/employee', { title: 'Express',path: "not-header",isAdmin: true });
});

router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Express',path: "not-header",isAdmin: true });
});

module.exports = router;
