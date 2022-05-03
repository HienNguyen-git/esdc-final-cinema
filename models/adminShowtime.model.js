const connect = require('../database/db')

const handleGetMapList = async () => new Promise((resolve, reject) => {
    connect.query("select * from showtime", (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const createNewMap = (start, day, idphim, idphongchieu) => new Promise((resolve, reject) => {
    const sql = 'INSERT INTO showtime(start,day,idphim,idphongchieu) values(?,?,?,?)';
    const value = [start, day, idphim, idphongchieu];
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})

const handleDeleteRoomById = (id) => new Promise((resolve, reject) => {
    const sql = 'DELETE FROM showtime WHERE idsuatchieu = ?';
    const value = id;
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})

const handleEditRoom = (start, day, idphim, idphongchieu, idsuatchieu) => new Promise((resolve, reject) => {
    const sql = 'UPDATE showtime SET start = ?,day = ?,idphim = ?, idphongchieu = ? WHERE idsuatchieu = ?';
    const value = [start, day, idphim, idphongchieu, idsuatchieu];
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})

module.exports = {
    handleGetMapList,
    createNewMap,
    handleDeleteRoomById,
    handleEditRoom
}