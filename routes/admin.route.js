var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/home', { title: 'Express' });
});

router.get('/bookings', function(req, res, next) {
  res.render('admin/bookings', { title: 'Express' });
});

router.get('/movies', function(req, res, next) {
  res.render('admin/movies', { title: 'Express' });
});

router.get('/hall', function(req, res, next) {
  res.render('admin/hall', { title: 'Express' });
});

router.get('/employee', function(req, res, next) {
  res.render('admin/employee', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Express' });
});

module.exports = router;
