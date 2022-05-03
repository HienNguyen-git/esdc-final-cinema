var express = require('express');
const { getMovieSchedule, getBookingOption, bookTicket,bookProduct } = require('../controller/booking.controller');
var router = express.Router();

router.get('/', getMovieSchedule)
router.get('/option', getBookingOption)
router.post('/ticket', bookTicket)
router.post('/product', bookProduct)




module.exports = router;
