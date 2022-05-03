const bcrypt = require('bcrypt')
const connect = require('../database/db')
const saltRounds = 10;
    
const handleChangePass = (newpass,email) => new Promise((resolve, reject) => {
    const sql = "UPDATE customer SET password = ? where email = ?"
    bcrypt.hash(newpass, saltRounds, (err, hash) => {
        const value = [hash,email]
        connect.query(sql, value, (err) => {
            if (err) reject(false)
        })
    })
    resolve(true)
})

const handleRegister = (name,gender,phone, email, password) => new Promise((resolve, reject) => {
    const sql = "insert into customer(name,gender,phone, email,password) values(?,?,?,?,?)"
    bcrypt.hash(password, saltRounds, (err, hash) => {
        const value = [name,gender,phone, email, hash]
        connect.query(sql, value, (err) => {
            if (err) reject(false)
        })
    })
    resolve(true)
})

const handleLogin = (email) => new Promise((resolve, reject) => {
    connect.query('select * from customer where email=?', [email], (err, result) => {
        if (err) reject(false)
        else {
            const user = result[0]
            resolve(user)
        }
    })
})

const getTicketByID = (id) => new Promise((resolve,reject)=>{
    connect.query('select * from ticket where idve=?', [id], (err, result) => {
        if (err) reject(err.message)
        else {
            resolve(result[0])
        }
    })
})

const getCustomerById = (id) => new Promise((resolve,reject)=>{
    connect.query('select * from customer where idkh=?', [id], (err, result) => {
        if (err) reject(err.message)
        else {
            resolve(result[0])
        }
    })
})

const getRoomById = (id) => new Promise((resolve,reject)=>{
    connect.query('select * from room where idphongchieu=?', [id], (err, result) => {
        if (err) reject(err.message)
        else {
            resolve(result[0])
        }
    })
})

const getTicketsByCustomerId = (id) => new Promise((resolve,reject)=>{
    connect.query('select * from ticket where idkh=?', [id], (err, result) => {
        if (err) reject(err.message)
        else {
            resolve(result)
        }
    })
})

const getBillById = (id) => new Promise((resolve,reject) =>{
    connect.query('select * from billdetail,product where billdetail.idsp = product.idsp and idve=?', [id], (err, result) => {
        if (err) reject(err.message)
        else {
            resolve(result)
        }
    })
})

module.exports = {
    handleRegister,
    handleLogin,
    handleChangePass,
    getTicketByID,
    getCustomerById,
    getRoomById,
    getBillById,
    getTicketsByCustomerId
}