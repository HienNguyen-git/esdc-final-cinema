const { validationResult } = require('express-validator');
const { formatDate, getDays, getMonths, getDates, getYears, sleep } = require('../config/helper');
const Login = require('../models/account.model');
const { getMovieDetailById } = require('../models/movie.model');
const { getScheduleByID } = require('../models/schedule.model');

<<<<<<< HEAD
=======
const fs = require('fs')
const pdf = require('html-pdf')
const path = require('path')
const options = require('../config/ticket-format')
>>>>>>> b6a09ecd6dd63f6991f531a13ba0bcb0d868bc16
// Handle login
const loginGet = (req, res) => {
    res.render('account/login', { title: 'Login', path: "not-header" })
}

const loginPost = async (req, res) => {
    let resultValidate = validationResult(req);
    if (resultValidate.errors.length === 0) {
        if (await Login.handleLogin(req.body.email)) {
            req.session.user = req.body.email
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
        const { name, gender, phone, email, password } = req.body
        console.log(name, gender, phone, email, password);
        if (await Login.handleRegister(name, gender, phone, email, password)) {
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


const manageGet = async (req, res) => {
    let ticket
    // if(req.session.user===undefined){
    //     return res.redirect('/account/login')
    // }else{
    const data = await Login.handleLogin("tronghien@mail.com");
    // console.log(ticketRaw)
    const ticketRaw = await Login.getTicketsByCustomerId(data.idkh)

    ticket = ticketRaw.map(e => ({
        idve: e.idve,
        price: e.price,
        seat: e.seat,
        schedule: e.idsuatchieu
    }))
    console.log(ticket)
    res.render('account/manage', { title: "Manage", path: "account/manage", data, ticket })
    // }
}

const changepasssGet = async (req, res) => {
    res.render('account/changepassword');
}

const changepassPost = async (req, res) => {
    let result = validationResult(req);
    if (result.errors.length === 0) {
        let { password, newpass, renewpass } = req.body;
        // console.log(password,newpass,renewpass);
        if (newpass !== renewpass || newpass === '' || renewpass === '') {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "New password and Renew Password have problem"
            }
            return res.redirect('/account/changepassword');
        }
        else if (await Login.handleChangePass(newpass, req.session.user)) {
            console.log(newpass, req.session.user);
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Change password successful"
            }
            return res.redirect('/account/changepassword')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong here2"
            }
            return res.redirect('/account/changepassword')
        }
    } else {
        const errors = result.mapped()
        let errorMessage = errors[Object.keys(errors)[0]].msg
        req.session.flash = {
            type: "danger",
            intro: "Oops!",
            message: errorMessage
        }
        res.redirect('/account/changepassword')
    }


}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/account/login')
}

const getTicket = async (req, res) => {
    const id = req.query["id"]
    if (id === undefined) return res.redirect('/')
    let ticket
    let schedule
    let movie
    let customer
    let room
    try {
        // Get ticket
        const ticketRaw = await Login.getTicketByID(id)
        ticket = {
            id: ticketRaw.idve,
            price: ticketRaw.price,
            seat: ticketRaw.seat,
            idsuatchieu: ticketRaw.idsuatchieu,
            idkh: ticketRaw.idkh,
        }
        // Get schedule
        const scheduleRaw = await getScheduleByID(ticket.idsuatchieu)
        schedule = {
            idsuatchieu: scheduleRaw.idsuatchieu,
            start: scheduleRaw.start.slice(0, -3),
            day: getDays(scheduleRaw.day),
            date: getDates(scheduleRaw.day),
            month: getMonths(scheduleRaw.day),
            year: getYears(scheduleRaw.day),
            idphim: scheduleRaw.idphim,
            idphongchieu: scheduleRaw.idphongchieu,
        }
        // Get movie
        const movieRaw = await getMovieDetailById(schedule.idphim)
        movie = movieRaw.title
        // Get customer
        const customerRaw = await Login.getCustomerById(ticket.idkh)
        customer = customerRaw.name
        // Get room
        const roomRaw = await Login.getRoomById(schedule.idphongchieu)
        room = roomRaw.name
        console.log(await ticket)
    } catch (error) {
        console.log(error.message)
    }
<<<<<<< HEAD
    console.log(schedule)
=======


    // File setting
    // const fileName = path.join(__dirname, 'docs', `${ticket.id}.pdf`)

    // const filepath = 'http://localhost:3000/docs/' + fileName;
    // res.render('account/ticket', {
    //     layout: false,
    //     ticket,
    //     schedule,
    //     movie,
    //     customer,
    //     room
    // }, (myErr, html) => {
    //     pdf.create(html, options).toFile(filepath, (err, result) => {
    //         if (err) return console.error(err.message)
    //         else {
    //             console.log(res)
    //             const dataFile = fs.readFileSync(filepath)
    //             res.header('content-type', 'application/pdf')
    //             res.send(dataFile)
    //         }
    //     })
    // })

    res.render('account/ticket-view', {
        layout: false,
        ticket,
        schedule,
        movie,
        customer,
        room
    })
}


const printTicket = async (req, res) => {
    const id = req.query["id"]
    if (id === undefined) return res.redirect('/')

    let ticket
    let schedule
    let movie
    let customer
    let room

    try {
        // Get ticket
        const ticketRaw = await Login.getTicketByID(id)
        ticket = {
            id: ticketRaw.idve,
            price: ticketRaw.price,
            seat: ticketRaw.seat,
            idsuatchieu: ticketRaw.idsuatchieu,
            idkh: ticketRaw.idkh,
        }
        // Get schedule
        const scheduleRaw = await getScheduleByID(ticket.idsuatchieu)
        schedule = {
            idsuatchieu: scheduleRaw.idsuatchieu,
            start: scheduleRaw.start.slice(0, -3),
            day: getDays(scheduleRaw.day),
            date: getDates(scheduleRaw.day),
            month: getMonths(scheduleRaw.day),
            year: getYears(scheduleRaw.day),
            idphim: scheduleRaw.idphim,
            idphongchieu: scheduleRaw.idphongchieu,
        }
        // Get movie
        const movieRaw = await getMovieDetailById(schedule.idphim)
        movie = movieRaw.title
        // Get customer
        const customerRaw = await Login.getCustomerById(ticket.idkh)
        customer = customerRaw.name
        // Get room
        const roomRaw = await Login.getRoomById(schedule.idphongchieu)
        room = roomRaw.name
        console.log(await ticket)
    } catch (error) {
        console.log(error.message)
    }

    // File setting
    const filepath = path.join(__dirname, 'docs', `${ticket.id}.pdf`)
>>>>>>> b6a09ecd6dd63f6991f531a13ba0bcb0d868bc16
    res.render('account/ticket', {
        ticket,
        schedule,
        movie,
        customer,
        room
<<<<<<< HEAD
=======
    }, (myErr, html) => {
        pdf.create(html, options).toFile(filepath, (err, result) => {
            if (err) return console.error(err.message)
            else {
                console.log(res)
                const dataFile = fs.readFileSync(filepath)
                res.header('content-type', 'application/pdf')
                res.send(dataFile)
            }
        })
>>>>>>> b6a09ecd6dd63f6991f531a13ba0bcb0d868bc16
    })
}

module.exports = {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    manageGet,
    changepasssGet,
    changepassPost,
    logout,
    getTicket,
    printTicket
}