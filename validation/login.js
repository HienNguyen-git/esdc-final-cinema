
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
    check('name').exists().withMessage("Please enter your name").notEmpty().withMessage("Name can not be empty"),
    check('phone').exists().withMessage("Please enter your phone").notEmpty().withMessage("Phone can not be empty"),
    check('gender').exists().withMessage("Please enter your gender").notEmpty().withMessage("Gender can not be empty"),
    check('role').exists().withMessage("Please enter your role").notEmpty().withMessage("Role can not be empty"),
]

const productValidator = [
    check('name').exists().withMessage("Please enter your name").notEmpty().withMessage("Name can not be empty"),
    check('price').exists().withMessage("Please enter your price").notEmpty().withMessage("price can not be empty"),
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
]

const productEditValidator = [
    check('name').exists().withMessage("Please enter your name").notEmpty().withMessage("Name can not be empty"),
    check('price').exists().withMessage("Please enter your price").notEmpty().withMessage("price can not be empty"),
]

const newsValidator = [
    check('title').exists().withMessage("Please enter your title").notEmpty().withMessage("title can not be empty"),
    check('day').exists().withMessage("Please enter your day").notEmpty().withMessage("day can not be empty"),
    check('content').exists().withMessage("Please enter your Content").notEmpty().withMessage("Content can not be empty"),
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
]

const newsEditValidator = [
    check('title').exists().withMessage("Please enter your title").notEmpty().withMessage("title can not be empty"),
    check('day').exists().withMessage("Please enter your day").notEmpty().withMessage("day can not be empty"),
    check('content').exists().withMessage("Please enter your Content").notEmpty().withMessage("Content can not be empty"),
]

const promotionValidator = [
    check('title').exists().withMessage("Please enter your title").notEmpty().withMessage("title can not be empty"),
    check('day').exists().withMessage("Please enter your day").notEmpty().withMessage("day can not be empty"),
    check('content').exists().withMessage("Please enter your Content").notEmpty().withMessage("Content can not be empty"),
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
]

const promotionEditValidator = [
    check('title').exists().withMessage("Please enter your title").notEmpty().withMessage("title can not be empty"),
    check('day').exists().withMessage("Please enter your day").notEmpty().withMessage("day can not be empty"),
    check('content').exists().withMessage("Please enter your Content").notEmpty().withMessage("Content can not be empty"),
]

const moviesValidator = [
    check('title').exists().withMessage("Please enter your title").notEmpty().withMessage("title can not be empty"),
    check('overview').exists().withMessage("Please enter your overview").notEmpty().withMessage("overview can not be empty"),
    check('vote_average').exists().withMessage("Please enter your vote_average").notEmpty().withMessage("vote_average can not be empty"),
    check('release_date').exists().withMessage("Please enter your release_date").notEmpty().withMessage("release_date can not be empty"),
    check('duration').exists().withMessage("Please enter your duration").notEmpty().withMessage("duration can not be empty"),
    check('image').custom((value, { req }) => {
        if (!req.file) throw new Error("Profile Img is required");
        return true;
    }),
]

const moviesEditValidator = [
    check('title').exists().withMessage("Please enter your title").notEmpty().withMessage("title can not be empty"),
    check('overview').exists().withMessage("Please enter your overview").notEmpty().withMessage("overview can not be empty"),
    check('vote_average').exists().withMessage("Please enter your vote_average").notEmpty().withMessage("vote_average can not be empty"),
    check('release_date').exists().withMessage("Please enter your release_date").notEmpty().withMessage("release_date can not be empty"),
    check('duration').exists().withMessage("Please enter your duration").notEmpty().withMessage("duration can not be empty"),
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
    
    validationResult
}