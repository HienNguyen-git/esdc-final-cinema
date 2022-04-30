var express = require('express');
const { getMovieSchedule, getBookingOption } = require('../controller/booking.controller');
var router = express.Router();

router.get('/',getMovieSchedule)
router.get('/option',getBookingOption)




module.exports = router;
