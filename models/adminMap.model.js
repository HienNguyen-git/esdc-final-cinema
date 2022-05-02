const connect = require('../database/db')

const handleGetMapList = async () => new Promise((resolve, reject) => {
    connect.query("select * from map", (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

module.exports = {
    handleGetMapList
}