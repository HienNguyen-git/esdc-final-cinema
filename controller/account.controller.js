const { validationResult } = require('express-validator');
const Login = require('../models/account.model')

// Handle login
const loginGet = (req, res) => {
    res.render('account/login', { title: 'Login', path: "not-header" })
}

const loginPost = async (req, res) => {
    let resultValidate = validationResult(req);
    if (resultValidate.errors.length === 0) {
        if (await Login.handleLogin(req.body.email)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Your account has been successfully logged in!!!!"
            }
            return res.redirect("/")
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Your email not match"
            }
            return res.redirect('/account/login')
        }
    } else {
        const errors = resultValidate.mapped()
        console.log(errors)
        let errorMessage = errors[Object.keys(errors)[0]].msg
        console.log("OK")
        console.log({
            type: "danger",
            intro: "Oops!",
            message: errorMessage
        })
        req.session.flash = {
            type: "danger",
            intro: "Oops!",
            message: errorMessage
        }
        res.redirect('/account/login')
    }
}

const registerGet = (req, res) => {
    res.render('account/register', { title: "Register", path: "not-header" })
}

const registerPost = async (req, res) => {
    let result = validationResult(req);
    if (result.errors.length === 0) {
        const { name, email, password } = req.body
        if (await Login.handleRegister(name, email, password)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Register successful, Login now!!!!"
            }
            return res.redirect('/account/register')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/account/register')
        }
    } else {
        const errors = result.mapped()
        let errorMessage = errors[Object.keys(errors)[0]].msg
        req.session.flash = {
            type: "danger",
            intro: "Oops!",
            message: errorMessage
        }
        res.redirect('/account/register')
    }
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/account/login')
}
module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logout
}