var express = require('express');
const { getMovieDetailById } = require('../models/movie.model');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Home', path: "" });
});

router.get('/movie-detail/:id')
module.exports = router;  