const connect = require('../database/db')

const getRoomList = async () => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM room';
    connect.query(sql, (err, result) => {
        if (err) reject(false);
        else {
            resolve(result);
        }
    })
})
const getRoomById = (id) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM room WHERE idphongchieu = ?';
    connect.query(sql, [id], (err, result) => {
        if (err) reject(false);
        else {
            resolve(result[0]);
        }
    })
})

const createNewRoom = (name, idmap) => new Promise((resolve, reject) => {
    const sql = 'INSERT INTO room(name,idmap) values(?,?)';
    const value = [name, idmap];
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})

const handleDeleteRoomById = (id) => new Promise((resolve, reject) => {
    const sql = 'DELETE FROM room WHERE idphongchieu = ?';
    const value = id;
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})

const handleEditRoom = (idphongchieu, name, idmap) => new Promise((resolve, reject) => {
    const sql = 'UPDATE news SET name = ?,idmap = ? WHERE idphongchieu = ?';
    const value = [name, idmap, idphongchieu];
    connect.query(sql, value, (err) => {
        if (err) reject(false);
        else {
            resolve(true);
        }
    })
})




module.exports = {
    getRoomList,
    getRoomById,
    createNewRoom,
    handleDeleteRoomById,
    handleEditRoom
}