const connect = require('../database/db')

const getScheduleByDate = async (date) => new Promise((resolve, reject) => {
    connect.query('select * from showtime where day=?', [date], (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const getScheduleDateList = async()=> new Promise((resolve, reject)=>{
    connect.query("SELECT day FROM showtime GROUP BY day ASC",(err,result)=>{
        if(err) reject(err.message)
        resolve(result)
    })
})

const getTheNearestDay = async()=> new Promise((resolve, reject)=>{
    connect.query("SELECT day FROM showtime GROUP BY day ASC LIMIT 1",(err,result)=>{
        if(err) reject(err.message)
        resolve(result)
    })
})

module.exports = {
    getScheduleByDate,
    getScheduleDateList,
    getTheNearestDay
}