const connect = require('../database/db');

const handleReadNews = () => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM movie';
    connect.query(sql,[],(err,result)=>{
        if(err) reject(false);
        else{
            // console.log(result);
            resolve(result);
        }
    })
})

const handleReadNewsById = (id) => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM movie WHERE idphim = ?';
    connect.query(sql,[id],(err,result)=>{
        if(err) reject(false);
        else{
            // console.log(result);
            resolve(result[0]);
        }
    })
})

const handleCreateNews = (title,overview,vote_average,release_date,poster_path,duration) => new Promise((resolve,reject)=>{
    const sql = 'INSERT INTO movie(title,overview,vote_average,release_date,poster_path,duration) values(?,?,?,?,?,?)';
    const value = [title,overview,vote_average,release_date,poster_path,duration];
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleDeleteNews = (id) => new Promise((resolve,reject)=>{
    const sql = 'DELETE FROM movie WHERE idphim = ?';
    const value = id;
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleEditNews = (title,overview,vote_average,release_date,poster_path,duration,id) => new Promise((resolve,reject)=>{
    const sql = 'UPDATE movie SET title = ?,overview = ?, vote_average = ?, release_date = ?, poster_path = ?, duration = ? WHERE idphim = ?';
    const value = [title,overview,vote_average,release_date,poster_path,duration,id];
    connect.query(sql,value,(err,result)=>{
        console.log(value);
        // console.log(result);
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

module.exports = {
    handleReadNews,
    handleCreateNews,
    handleDeleteNews,
    handleEditNews,
    handleReadNewsById

}