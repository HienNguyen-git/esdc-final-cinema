var express = require('express');
var router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'public/images/popcorn' })
// const bodyParser = require('body-parser'); // xử form dữ liệu
// router.use(bodyParser.urlencoded({extended: false})); //form

const { registerValidator, loginValidator,
  EmployeeValidator,
  productValidator,productEditValidator,
  newsValidator,newsEditValidator,
  promotionValidator,promotionEditValidator,
  moviesValidator,moviesEditValidator } = require('../validation/login');

const { loginGet, loginPost, registerGet, registerPost } = require('../controller/adminAccount.controller');
const  {adminEmployeeGet,adminEmployeePost,adminEmployeeDelPost,adminEmployeeEditPost} = require('../controller/adminEmployee.controller');
const  {adminProductGet, adminProductPost, adminProductDelPost, adminProductEditPost} = require('../controller/adminProduct.controller');
const  {adminNewsGet,adminNewsPost,adminNewsDelPost,adminNewsEditPost} = require('../controller/adminNews.controller');
const  {adminPromotionGet,adminPromotionPost,adminPromotionDelPost,adminPromotionEditPost} = require('../controller/adminPromotion.controller');
const  {adminMoviesGet,adminMoviesPost,adminMoviesDelPost,adminMoviesEditPost} = require('../controller/adminMovies.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/home', { title: 'DashBoard',path: "not-header",isAdmin: true ,layout:'admin', routerPath: ''});
});

router.get('/bookings', function(req, res, next) {
  res.render('admin/bookings', { title: 'Bookings',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/bookings' });
});



router.get('/hall', function(req, res, next) {
  res.render('admin/hall', { title: 'Hall',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/hall' });
});

router.get('/login', loginGet);
router.post('/login', loginValidator, loginPost);
router.get('/register', registerGet);
router.post('/register', registerValidator, registerPost);

router.get('/employee', adminEmployeeGet);
router.post('/employee',EmployeeValidator,adminEmployeePost);
router.post('/employee/delete',adminEmployeeDelPost);
router.post('/employee/edit',EmployeeValidator,adminEmployeeEditPost);

router.get('/product', adminProductGet);
router.post('/product',upload.single('image'),productValidator,adminProductPost);
router.post('/product/delete',adminProductDelPost);
router.post('/product/edit',upload.single('image'),productEditValidator,adminProductEditPost);

router.get('/news', adminNewsGet);
router.post('/news',upload.single('image'),newsValidator, adminNewsPost);
router.post('/news/delete',adminNewsDelPost);
router.post('/news/edit',upload.single('image'),newsEditValidator,adminNewsEditPost);

router.get('/promotion', adminPromotionGet);
router.post('/promotion',upload.single('image'),promotionValidator, adminPromotionPost);
router.post('/promotion/delete',adminPromotionDelPost);
router.post('/promotion/edit',upload.single('image'),promotionEditValidator,adminPromotionEditPost);

router.get('/movies',adminMoviesGet);
router.post('/movies',upload.single('image'),moviesValidator, adminMoviesPost);
router.post('/movies/delete',adminMoviesDelPost);
router.post('/movies/edit',upload.single('image'),moviesEditValidator,adminMoviesEditPost);





module.exports = router;
