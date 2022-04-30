var express = require('express');
const { getMovieSchedule } = require('../controller/booking.controller');
var router = express.Router();

router.get('/',getMovieSchedule)




module.exports = router;
