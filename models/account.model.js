const bcrypt = require('bcrypt')
const connect = require('../database/db')

const handleRegister = (name, email, password) => {
    const sql = "insert into account(name, email,password) values(?,?,?)"
    bcrypt.hash(password, saltRounds, (err, hash) => {
        const value = [name, email, hash]
        connect.query(sql, value, (err) => {
            if (err) return false
        })
    })
    return true
}

const handleLogin = (email) => {
    connect.query('select * from account where email=?', [email], (err, result) => {
        if (err) return false
        else {
            const user = result[0]
            return user
        }
    })
}

module.exports = {
    handleRegister,
    handleLogin
}