const connect = require('../database/db')

const handleGetMapList = async () => new Promise((resolve, reject) => {
    connect.query("select * from map", (err, result) => {
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
    const sql = 'DELETE FROM map WHERE id = ?';
    const value = id;
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
    handleGetMapList,
    createNewMap,
    handleDeleteRoomById,
    handleEditRoom
}