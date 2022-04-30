const connect = require('../database/db');

const handleReadProduct = () => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM product';
    connect.query(sql,[],(err,result)=>{
        if(err) reject(false);
        else{
            // console.log(result);
            resolve(result);
        }
    })
})

const handleReadProductById = (id) => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM product WHERE idsp = ?';
    connect.query(sql,[id],(err,result)=>{
        if(err) reject(false);
        else{
            // console.log(result);
            resolve(result[0]);
        }
    })
})

const handleCreateProduct = (name,price,picture_path) => new Promise((resolve,reject)=>{
    const sql = 'INSERT INTO product(name,price,picture_path) values(?,?,?)';
    const value = [name,price,picture_path];
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleDeleteProduct = (id) => new Promise((resolve,reject)=>{
    const sql = 'DELETE FROM product WHERE idsp = ?';
    const value = id;
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleEditProduct = (name,price,picture_path,id) => new Promise((resolve,reject)=>{
    const sql = 'UPDATE product SET name = ?,price = ?,picture_path = ? WHERE idsp = ?';
    const value = [name,price,picture_path,id];
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
    handleReadProduct,
    handleCreateProduct,
    handleDeleteProduct,
    handleEditProduct,
    handleReadProductById

}