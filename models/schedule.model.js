const connect = require('../database/db')
const { formatDate, reverseDate } = require("../config/helper")


const getScheduleByDate = async (date) => new Promise((resolve, reject) => {
    connect.query('select * from showtime where day=?', [date], (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const getScheduleDateList = async () => new Promise((resolve, reject) => {
    connect.query("SELECT day FROM showtime GROUP BY day ASC", (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const getTheNearestDay = async () => new Promise((resolve, reject) => {
    connect.query("SELECT day FROM showtime GROUP BY day ASC LIMIT 1", (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const getScheduleByMovie = async(id) => new Promise((resolve,reject)=>{
    connect.query("SELECT * FROM showtime where idphim=? ORDER BY `start` ASC",[id], (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

module.exports = {
    getScheduleByDate,
    getScheduleDateList,
    getTheNearestDay,
    getScheduleByMovie
}