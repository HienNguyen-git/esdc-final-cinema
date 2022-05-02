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

module.exports = {
    handleRegister,
    handleLogin,
    handleChangePass
}