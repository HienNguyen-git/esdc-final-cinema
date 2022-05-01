var express = require('express');
const { logout } = require('../controller/account.controller');
const { getScheduleList } = require('../controller/booking.controller');
var router = express.Router();
const { getMovieDetail, getHome } = require('../controller/movie.controller')
const {getNewsDetail} = require('../controller/adminNews.controller');
const {getPromotionDetail} = require('../controller/adminPromotion.controller');

/* GET home page. */
router.get('/', getHome);

router.get('/movie-detail', getMovieDetail)

router.get('/schedule',getScheduleList)

router.get('/logout', logout)


const adminProduct = require('../models/adminProduct.model');

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

router.get('/news-detail',getNewsDetail);
router.get('/promotion-detail',getPromotionDetail);


module.exports = router;  