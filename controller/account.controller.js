const { validationResult } = require('express-validator');
const Login = require('../models/account.model')

// Handle login
const loginGet = (req, res) => {
    res.render('account/login', { title: 'Login' })
}

const loginPost = (req, res) => {
    let resultValidate = validationResult(req);
    if (resultValidate.errors.length === 0) {
        console.log(Login.handleLogin(req.body.email))
        // if(Login.handleLogin(req.body.email)){
        //     req.session.flash = {
        //         type: "success",
        //         intro: "Congratulation!",
        //         message: "Your account has been successfully logged in!!!!"
        //     }
        //     return res.redirect("/")
        // }else{
        //     req.session.flash = {
        //         type: "danger",
        //         intro: "Oops!",
        //         message: "Your email not match"
        //     }
        //     return res.redirect('/account/login')
        // }
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

module.exports = {
    loginGet,
    loginPost
}