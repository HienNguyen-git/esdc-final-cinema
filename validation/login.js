
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
            connect.query('select * from customer where email=?', [value], (err, result) => {
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
            connect.query('select * from customer where email=?', [value], (err, result) => {
                if (err) reject(new Error(err.message))
                else if (result.length === 0) reject(new Error("This email has not been registered yet."))
                resolve(true)
            })
        })
    }),
    check('password').exists().withMessage("Please enter your password").notEmpty().withMessage("Password can not be empty").custom((value, { req }) =>
        new Promise((resolve, reject) => { // Check password is match 
            connect.query('select * from customer where email=?', [req.body.email], (err, result) => {
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

const changePassValidator = [
    check('password').exists().withMessage("Please enter your old password").notEmpty().withMessage("Old Password can not be empty").custom((value, { req }) =>
        new Promise((resolve, reject) => { // Check password is match 
            connect.query('select * from customer where email=?', [req.session.user], (err, result) => {
                // console.log(result);
                if (err) reject(new Error("Something went wrong! here"))
                else if (!result.length) reject(new Error("Something went wrong here1!"))
                else {
                    const accPass = result[0].password
                    
                    const isMatch = bcrypt.compareSync(value, accPass)
                    if (!isMatch) reject("Old password not match")
                    resolve(isMatch)
                }
            })
        })),
]

const EmployeeValidator = [
    check('name').exists().withMessage("Please enter employee name").notEmpty().withMessage("Employee Name can not be empty"),
    check('phone').exists().withMessage("Please enter employee phone").notEmpty().withMessage("Employee Phone can not be empty"),
    check('gender').exists().withMessage("Please enter employee gender").notEmpty().withMessage("Employee Gender can not be empty"),
    check('role').exists().withMessage("Please enter employee role").notEmpty().withMessage("Employee Role can not be empty"),
]

const productValidator = [
    check('name').exists().withMessage("Please enter product name").notEmpty().withMessage("Product Name can not be empty"),
    check('price').exists().withMessage("Please enter product price").notEmpty().withMessage("Product price can not be empty"),
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
]

const productEditValidator = [
    check('name').exists().withMessage("Please enter product name").notEmpty().withMessage("Product Name can not be empty"),
    check('price').exists().withMessage("Please enter product price").notEmpty().withMessage("Product price can not be empty"),
]

const newsValidator = [
    check('title').exists().withMessage("Please enter news title").notEmpty().withMessage("News title can not be empty"),
    check('day').exists().withMessage("Please enter news day").notEmpty().withMessage("News day can not be empty"),
    check('content').exists().withMessage("Please enter news Content").notEmpty().withMessage("News Content can not be empty"),
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
]

const newsEditValidator = [
    check('title').exists().withMessage("Please enter news title").notEmpty().withMessage("News title can not be empty"),
    check('day').exists().withMessage("Please enter news day").notEmpty().withMessage("News day can not be empty"),
    check('content').exists().withMessage("Please enter news Content").notEmpty().withMessage("News Content can not be empty"),
]

const promotionValidator = [
    check('title').exists().withMessage("Please enter promotion title").notEmpty().withMessage("Promotion title can not be empty"),
    check('day').exists().withMessage("Please enter promotion day").notEmpty().withMessage("Promotion day can not be empty"),
    check('content').exists().withMessage("Please enter promotion Content").notEmpty().withMessage("Promotion Content can not be empty"),
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
]

const promotionEditValidator = [
    check('title').exists().withMessage("Please enter promotion title").notEmpty().withMessage("Promotion title can not be empty"),
    check('day').exists().withMessage("Please enter promotion day").notEmpty().withMessage("Promotion day can not be empty"),
    check('content').exists().withMessage("Please enter promotion Content").notEmpty().withMessage("Promotion Content can not be empty"),
]

const moviesValidator = [
    check('title').exists().withMessage("Please enter movie title").notEmpty().withMessage("Movie title can not be empty"),
    check('overview').exists().withMessage("Please enter movie overview").notEmpty().withMessage("Movie overview can not be empty"),
    check('vote_average').exists().withMessage("Please enter movie vote_average").notEmpty().withMessage("Movie vote_average can not be empty"),
    check('release_date').exists().withMessage("Please enter movie release_date").notEmpty().withMessage("Movie release_date can not be empty"),
    check('duration').exists().withMessage("Please enter movie duration").notEmpty().withMessage("Movie duration can not be empty"),
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
]

const moviesEditValidator = [
    check('title').exists().withMessage("Please enter movie title").notEmpty().withMessage("Movie title can not be empty"),
    check('overview').exists().withMessage("Please enter movie overview").notEmpty().withMessage("Movie overview can not be empty"),
    check('vote_average').exists().withMessage("Please enter movie vote_average").notEmpty().withMessage("Movie vote_average can not be empty"),
    check('release_date').exists().withMessage("Please enter movie release_date").notEmpty().withMessage("Movie release_date can not be empty"),
    check('duration').exists().withMessage("Please enter movie duration").notEmpty().withMessage("Movie duration can not be empty"),
]

const roomsValidator = [
    check('name').exists().withMessage("Please enter room name").notEmpty().withMessage("Room name can not be empty"),
    check('idmap').exists().withMessage("Please enter room idmap").notEmpty().withMessage("Room idmap can not be empty"),
]

const mapValidator = [
    check('rowNum').exists().withMessage("Please enter row of map").notEmpty().withMessage("Row can not be empty"),
    check('colNum').exists().withMessage("Please enter column of map").notEmpty().withMessage("Column can not be empty"),
]

const showtimeValidator = [
    check('start').exists().withMessage("Please enter showtime start").notEmpty().withMessage("Showtime start can not be empty"),
    check('day').exists().withMessage("Please enter showtime day").notEmpty().withMessage("Showtime day can not be empty"),
    check('idphim').exists().withMessage("Please enter showtime idphim").notEmpty().withMessage("Showtime idphim can not be empty"),
    check('idphongchieu').exists().withMessage("Please enter showtime idphongchieu").notEmpty().withMessage("Showtime idphongchieu can not be empty"),
]
module.exports = {
    registerValidator,
    loginValidator,
    changePassValidator,
    
    EmployeeValidator,
    
    productValidator,
    productEditValidator,

    newsValidator,
    newsEditValidator,
    
    promotionValidator,
    promotionEditValidator,

    moviesValidator,
    moviesEditValidator,

    roomsValidator,

    mapValidator,

    showtimeValidator,
    
    validationResult
}