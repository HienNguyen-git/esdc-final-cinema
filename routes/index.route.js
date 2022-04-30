var express = require('express');
const { logout } = require('../controller/account.controller');
const { getScheduleList } = require('../controller/booking.controller');
var router = express.Router();
const { getMovieDetail, getHome } = require('../controller/movie.controller')
const {getNewsDetail} = require('../controller/adminNews.controller');
/* GET home page. */
router.get('/', getHome);

router.get('/movie-detail', getMovieDetail)

router.get('/schedule',getScheduleList)

router.get('/logout', logout)


const adminProduct = require('../models/adminProduct.model');
const { route } = require('./admin.route');

router.get('/popcorn', async(req,res)=>{
    try {
        const adminProducts = await adminProduct.handleReadProduct();
        var resultArray = Object.values(JSON.parse(JSON.stringify(adminProducts)));
        // console.log(resultArray);
        res.render('booking/popcorn', { title: 'Product',resultArray});
    } catch (error) {
        console.log(error);
    }
})

router.get('/news-detail/:id',getNewsDetail);


module.exports = router;  