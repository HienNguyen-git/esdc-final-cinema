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

module.exports = {
    handleReadProduct,
    handleCreateProduct
}