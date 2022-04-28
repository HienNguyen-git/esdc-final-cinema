const connect = require('../database/db')

const getMovieList = () => new Promise((resolve, reject) => {
    connect.query('select * from movietable', (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const getMovieDetailById = (id)=> new Promise((resolve,reject)=>{
    connect.query('select * from movietable where movieID=?',[id], (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})


module.exports = {
    getMovieList,
    getMovieDetailById,
}