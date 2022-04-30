const { reverseDate, formatDate } = require('../config/helper')
const { getTheNearestDay } = require('../models/schedule.model')
const { getMovieDetailById, getMovieList } = require('../models/movie.model')
const { handleReadNews } = require('../models/adminNews.model');
const date = new Date()

const getMovieDetail = async (req, res) => {
    const id = req.query['id']
    const data = await getMovieDetailById(id)
    const isoDateTime = new Date(data.release_date)
    const dmyDateTime = isoDateTime.getDate()+"-"+isoDateTime.getMonth()+"-"+isoDateTime.getFullYear()
    const context = {
        id: data.idphim,
        img: data.poster_path,
        title: data.title,
        overview: data.overview,
        vote_average: data.vote_average,
        release_date: dmyDateTime,
        duration: data.duration
    }
    console.log(context)
    res.render('booking/view_detail', { title: "Detail of movie", path: "", context })
}

const getHome = async (req, res) => {
    const data = await getMovieList()
    const context = data.map(movie => ({
        id: movie.idphim,
        img: movie.poster_path,
        title: movie.title,
    }))

    const news = await handleReadNews();
    const contextNews = news.map(n => ({
        id: n.idtin,
        title: n.title,
        day: formatDate(n.day),
        content: n.content,
        img: n.picture_path,
    }))
    res.render('home', { title: 'Home', path: "", context,contextNews })
}


module.exports = {
    getMovieDetail,
    getHome,
}