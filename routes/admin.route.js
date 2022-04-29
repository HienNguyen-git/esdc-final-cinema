var express = require('express');
var router = express.Router();

const { loginGet, loginPost, registerGet, registerPost } = require('../controller/adminAccount.controller');
const { registerValidator, loginValidator,EmployeeValidator } = require('../validation/login');
const  {adminEmployeeGet,adminEmployeePost,adminEmployeeDelPost,adminEmployeeEditPost} = require('../controller/adminEmployee.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/home', { title: 'DashBoard',path: "not-header",isAdmin: true ,layout:'admin', routerPath: ''});
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

router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/employee', adminEmployeeGet);

router.post('/login', loginValidator, loginPost);
router.post('/register', registerValidator, registerPost);
router.post('/employee',EmployeeValidator,adminEmployeePost);
router.post('/employee/delete',adminEmployeeDelPost);
router.post('/employee/edit',EmployeeValidator,adminEmployeeEditPost);

module.exports = router;
