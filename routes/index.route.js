var express = require('express');
var router = express.Router();
const { getMovieDetail, getHome } = require('../controller/movie.controller')

/* GET home page. */
router.get('/', getHome);

router.get('/movie-detail', getMovieDetail)

router.get('/user-booking',)

router.get('/popcorn',(req,res)=>{
    res.render('booking/popcorn');
})

module.exports = router;  