var express = require('express');
const { logout } = require('../controller/account.controller');
const { getScheduleList } = require('../controller/booking.controller');
var router = express.Router();
const { getMovieDetail, getHome } = require('../controller/movie.controller')

/* GET home page. */
router.get('/', getHome);

router.get('/movie-detail', getMovieDetail)

router.get('/schedule',getScheduleList)

router.get('/logout', logout)

module.exports = router;  