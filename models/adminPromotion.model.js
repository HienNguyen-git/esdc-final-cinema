const connect = require('../database/db');

const handleReadPromotion = () => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM promotion';
    connect.query(sql,[],(err,result)=>{
        if(err) reject(false);
        else{
            // console.log(result);
            resolve(result);
        }
    })
})

const handleReadPromotionById = (id) => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM promotion WHERE idkm = ?';
    connect.query(sql,[id],(err,result)=>{
        if(err) reject(false);
        else{
            // console.log(result);
            resolve(result[0]);
        }
    })
})

const handleCreatePromotion = (title,day,content,note,picture_path) => new Promise((resolve,reject)=>{
    const sql = 'INSERT INTO promotion(title,day,content,note,picture_path) values(?,?,?,?,?)';
    const value = [title,day,content,note,picture_path];
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleDeletePromotion = (id) => new Promise((resolve,reject)=>{
    const sql = 'DELETE FROM promotion WHERE idkm = ?';
    const value = id;
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleEditPromotion = (title,day,content,note,picture_path,id) => new Promise((resolve,reject)=>{
    const sql = 'UPDATE promotion SET title = ?,day = ?,content = ?,note=?,picture_path = ? WHERE idkm = ?';
    const value = [title,day,content,note,picture_path,id];
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
    handleReadPromotion,
    handleCreatePromotion,
    handleDeletePromotion,
    handleEditPromotion,
    handleReadPromotionById

}