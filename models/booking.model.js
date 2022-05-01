const connect = require("../database/db")

const getRoomMapByID = async (id) => new Promise((resolve, reject) => {
    connect.query("Select * from map where id=?", [id], (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})

module.exports = {
    getRoomMapByID
}