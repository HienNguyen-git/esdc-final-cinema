const bcrypt = require('bcrypt')
const connect = require('../database/db')
const saltRounds = 10;
    

const handleRegister = (name, email, password) => new Promise((resolve, reject) => {
    const sql = "insert into account(name, email,password) values(?,?,?)"
    bcrypt.hash(password, saltRounds, (err, hash) => {
        const value = [name, email, hash]
        connect.query(sql, value, (err) => {
            if (err) reject(false)
        })
    })
    resolve(true)
})

const handleLogin = (email) => new Promise((resolve, reject) => {
    connect.query('select * from account where email=?', [email], (err, result) => {
        if (err) reject(false)
        else {
            const user = result[0]
            resolve(user)
        }
    })
})



module.exports = {
    handleRegister,
    handleLogin
}