const connect = require('../database/db')

const getMovieList = () => new Promise((resolve, reject) => {
    connect.query('select * from movie', (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const getMovieDetailById = (id) => new Promise((resolve, reject) => {
    connect.query('select * from movie where idphim=?', [id], (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})

const addMovie = (data) => new Promise((resolve, reject) => {
    connect.query('insert into movie values(?,?,?,?,?,?)', [data.title, data.overview, data.vote_average, data.release_date, data.poster_path, data.backdrop_path], (err) => {
        if (err) reject(false)
        resolve(true)
    })
})

const getALlMovieID = () => new Promise((resolve, reject) => {
    connect.query('select idphim from movie', (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})


module.exports = {
    getMovieList,
    getMovieDetailById,
    addMovie,
    getALlMovieID
}