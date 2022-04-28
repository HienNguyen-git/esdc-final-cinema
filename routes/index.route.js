var express = require('express');
var router = express.Router();
const { getMovieDetail, getHome } = require('../controller/movie.controller')

/* GET home page. */
router.get('/', getHome);

router.get('/movie-detail', getMovieDetail)

router.get('/user-booking',)

module.exports = router;  