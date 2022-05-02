const connect = require('../database/db')

const handleGetBookingsList = async () => new Promise((resolve, reject) => {
    connect.query("select * from ticket,showtime,movie,room where ticket.idsuatchieu = showtime.idsuatchieu && showtime.idphim = movie.idphim && showtime.idphongchieu = room.idphongchieu", (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const createNewMap = (numrow,numcolumn) => new Promise((resolve, reject) => {
    const sql = 'INSERT INTO map(numrow,numcolumn) values(?,?)';
    const value = [numrow,numcolumn];
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})

const handleDeleteRoomById = (id) => new Promise((resolve, reject) => {
    const sql = 'DELETE FROM ticket WHERE idve = ?';
    const value = id;
    console.log(value)
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})

const handleEditRoom = (numrow,numcolumn,id) => new Promise((resolve, reject) => {
    const sql = 'UPDATE map SET numrow = ?,numcolumn = ? WHERE id = ?';
    const value = [numrow,numcolumn,id];
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})

module.exports = {
    handleGetBookingsList,
    createNewMap,
    handleDeleteRoomById,
    handleEditRoom
}