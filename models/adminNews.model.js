const connect = require('../database/db');

const handleReadNews = () => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM news';
    connect.query(sql,[],(err,result)=>{
        if(err) reject(false);
        else{
            // console.log(result);
            resolve(result);
        }
    })
})

const handleReadNewsById = (id) => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM news WHERE idtin = ?';
    connect.query(sql,[id],(err,result)=>{
        if(err) reject(false);
        else{
            // console.log(result);
            resolve(result[0]);
        }
    })
})

const handleCreateNews = (title,day,content,picture_path) => new Promise((resolve,reject)=>{
    const sql = 'INSERT INTO news(title,day,content,picture_path) values(?,?,?,?)';
    const value = [title,day,content,picture_path];
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleDeleteNews = (id) => new Promise((resolve,reject)=>{
    const sql = 'DELETE FROM news WHERE idtin = ?';
    const value = id;
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleEditNews = (title,day,content,picture_path,id) => new Promise((resolve,reject)=>{
    const sql = 'UPDATE news SET title = ?,day = ?,content = ?,picture_path = ? WHERE idtin = ?';
    const value = [title,day,content,picture_path,id];
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