var express = require('express');
var router = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'public/images/popcorn' })

const { registerValidator, loginValidator,
  EmployeeValidator,
  productValidator, productEditValidator,
  newsValidator, newsEditValidator,
  promotionValidator, promotionEditValidator,
  moviesValidator, moviesEditValidator,
  roomsValidator,
  mapValidator,
  showtimeValidator } = require('../validation/login');

const { loginGet, loginPost, registerGet, registerPost } = require('../controller/adminAccount.controller');
const { adminEmployeeGet, adminEmployeePost, adminEmployeeDelPost, adminEmployeeEditPost } = require('../controller/adminEmployee.controller');
const { adminProductGet, adminProductPost, adminProductDelPost, adminProductEditPost } = require('../controller/adminProduct.controller');
const { adminNewsGet, adminNewsPost, adminNewsDelPost, adminNewsEditPost } = require('../controller/adminNews.controller');
const { adminPromotionGet, adminPromotionPost, adminPromotionDelPost, adminPromotionEditPost } = require('../controller/adminPromotion.controller');
const { adminMoviesGet, adminMoviesPost, adminMoviesDelPost, adminMoviesEditPost } = require('../controller/adminMovies.controller');
const { adminGetRooms, adminRoomsPost, adminRoomsDelPost, adminRoomsEditPost } = require('../controller/adminRoom.controller');
const { getMapList, adminMapPost, adminMapDelPost, adminMapEditPost } = require('../controller/adminMap.controller');
const { adminBookingsGet, adminBookingDelPost } = require('../controller/adminBookings.controller');
const { adminGetShowtime, adminShowtimePost, adminShowtimeDelPost, adminShowtimeEditPost } = require('../controller/adminShowtime.controller');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin/home', { title: 'DashBoard', path: "not-header", isAdmin: true, layout: 'admin', routerPath: '' });
});

router.get('/bookings', adminBookingsGet);
router.post('/bookings/delete', adminBookingDelPost);

router.get('/login', loginGet);
router.post('/login', loginValidator, loginPost);
router.get('/register', registerGet);
router.post('/register', registerValidator, registerPost);

router.get('/employee', adminEmployeeGet);
router.post('/employee', EmployeeValidator, adminEmployeePost);
router.post('/employee/delete', adminEmployeeDelPost);
router.post('/employee/edit', EmployeeValidator, adminEmployeeEditPost);

router.get('/product', adminProductGet);
router.post('/product', upload.single('image'), productValidator, adminProductPost);
router.post('/product/delete', adminProductDelPost);
router.post('/product/edit', upload.single('image'), productEditValidator, adminProductEditPost);

router.get('/news', adminNewsGet);
router.post('/news', upload.single('image'), newsValidator, adminNewsPost);
router.post('/news/delete', adminNewsDelPost);
router.post('/news/edit', upload.single('image'), newsEditValidator, adminNewsEditPost);

router.get('/promotion', adminPromotionGet);
router.post('/promotion', upload.single('image'), promotionValidator, adminPromotionPost);
router.post('/promotion/delete', adminPromotionDelPost);
router.post('/promotion/edit', upload.single('image'), promotionEditValidator, adminPromotionEditPost);

router.get('/movies', adminMoviesGet);
router.post('/movies', upload.single('image'), moviesValidator, adminMoviesPost);
router.post('/movies/delete', adminMoviesDelPost);
router.post('/movies/edit', upload.single('image'), moviesEditValidator, adminMoviesEditPost);

router.get('/rooms', adminGetRooms);
router.post('/rooms', roomsValidator, adminRoomsPost);
router.post('/rooms/delete', adminRoomsDelPost);
router.post('/rooms/edit', roomsValidator, adminRoomsEditPost);

router.get('/map', getMapList);
router.post('/map', mapValidator, adminMapPost);
router.post('/map/delete', adminMapDelPost);
router.post('/map/edit', mapValidator, adminMapEditPost);

router.get('/showtime', adminGetShowtime);
router.post('/showtime', showtimeValidator, adminShowtimePost);
router.post('/showtime/delete', adminShowtimeDelPost);
router.post('/showtime/edit', showtimeValidator, adminShowtimeEditPost);



module.exports = router;
