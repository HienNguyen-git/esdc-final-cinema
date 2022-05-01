var express = require('express');
const { getMovieSchedule, getBookingOption, bookTicket } = require('../controller/booking.controller');
var router = express.Router();

router.get('/', getMovieSchedule)
router.get('/option', getBookingOption)
router.post('/ticket', bookTicket)




module.exports = router;
