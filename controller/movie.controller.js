const { getMovieDetailById, getMovieList } = require('../models/movie.model')

const getMovieDetail = async (req, res) => {
    const id = req.query['id']
    const data = await getMovieDetailById(id)
    console.log(data)
    res.render('booking/view_detail', { title: "Detail of movie", path: "", data })
}

const getHome = async (req, res) => {
    const data = await getMovieList()
    console.log(data)
    const context = data.map(movie => ({
        id: movie.movieID,
        img: movie.movieImg.split('/')[1],
        title: movie.movieTitle,
        genre: movie.movieGenre,
        duration: movie.movieDuration,
        date: movie.movieRelDate,
        director: movie.movieDirector,
        actors: movie.movieActors,
    }))
    console.log(context)
    res.render('home', { title: 'Home', path: "", context })
}

module.exports = {
    getMovieDetail,
    getHome,
}