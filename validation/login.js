
const { check, validationResult } = require('express-validator')
const connect = require('../database/db')
const bcrypt = require('bcrypt')
// Validator
// ***************
const registerValidator = [
    check('name').exists().withMessage("Please enter your name").notEmpty().withMessage("Name can not be empty"),
    check('email').exists().withMessage("Please enter your email").notEmpty().withMessage("Email can not be empty").isEmail().withMessage("This email is not valid").custom((value) => {
        // Check email already exists in database
        return new Promise((resolve, reject) => {
            connect.query('select * from account where email=?', [value], (err, result) => {
                if (err) reject(new Error(err.message))
                else if (result.length > 0) reject(new Error("Email already exists. Login now or use another email to register"))
                else resolve(true)
            })
        })
    }),
    check('password').exists().withMessage("Please enter your password").notEmpty().withMessage("Password can not be empty").isLength({ min: 8 }).withMessage("Password at least 8 letters "),
    check('rePassword').exists().withMessage("Please enter your re-password").custom((value, { req }) => {
        // Check password and re-password are match
        if (value !== req.body.password) throw new Error("Re-password not match")
        return true
    })
]

const loginValidator = [
    check('email').exists().withMessage("Please enter your email").notEmpty().withMessage("Email can not be empty").isEmail().withMessage("This email is not valid").custom((value) => {
        // Check email already exists in database
        return new Promise((resolve, reject) => {
            connect.query('select * from account where email=?', [value], (err, result) => {
                if (err) reject(new Error(err.message))
                else if (result.length === 0) reject(new Error("This email has not been registered yet."))
                resolve(true)
            })
        })
    }),
    check('password').exists().withMessage("Please enter your password").notEmpty().withMessage("Password can not be empty").custom((value, { req }) =>
        new Promise((resolve, reject) => { // Check password is match 
            connect.query('select * from account where email=?', [req.body.email], (err, result) => {
                if (err) reject(new Error("Something went wrong!"))
                else if (!result.length) reject(new Error("Something went wrong!"))
                else {
                    const accPass = result[0].password
                    userSession = result[0].name
                    const isMatch = bcrypt.compareSync(value, accPass)
                    if (!isMatch) reject("Your email address or password are not match")
                    resolve(isMatch)
                }
            })
        })),
]

module.exports = {
    registerValidator,
    loginValidator,
    validationResult
}