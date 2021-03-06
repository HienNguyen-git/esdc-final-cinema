const { validationResult } = require('express-validator');
const { formatDate, getDays, getMonths, getDates, getYears, sleep } = require('../config/helper');
const Login = require('../models/account.model');
const { getMovieDetailById } = require('../models/movie.model');
const { getScheduleByID } = require('../models/schedule.model');

const pdf = require('html-pdf')
const options = require('../config/ticket-format')
const path = require('path')
const fs = require('fs')

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
    if (req.session.user === undefined) {
        return res.redirect('/account/login')
    } else {
        const data = await Login.handleLogin(req.session.user);

        const ticketRaw = await Login.getTicketsByCustomerId(data.idkh)

        ticket = ticketRaw.map(e => ({
            idve: e.idve,
            price: e.price,
            seat: e.seat,
            schedule: e.idsuatchieu
        }))

        res.render('account/manage', { title: "Manage", path: "account/manage", data, ticket })
    }
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
    const isPrint = req.query["print"]
    if (id === undefined) return res.redirect('/')
    let ticket
    let schedule
    let movie
    let customer
    let room
    let bill
    try {
        // Get ticket
        const ticketRaw = await Login.getTicketByID(id)
        
        // console.log(bill)
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

        //Get popcorn list
        let billRaw = await Login.getBillById(ticketRaw.idve);
        // console.log(ticketRaw.idve);
        // console.log(billRaw)
        bill = billRaw.map(b=>({
            name: b.name,
            quantity: b.quantity
        }))
        // console.log(bill)

        // Get movie
        const movieRaw = await getMovieDetailById(schedule.idphim)
        movie = movieRaw.title
        // Get customer
        const customerRaw = await Login.getCustomerById(ticket.idkh)
        customer = customerRaw.name
        // Get room
        const roomRaw = await Login.getRoomById(schedule.idphongchieu)
        room = roomRaw.name
    } catch (error) {
        console.log(error.message)
    }

    // Handle ticket
    if (!isPrint) { // Preview ticket
        return res.render('account/ticket', {
            ticket,
            schedule,
            movie,
            customer,
            room,
            bill
        })
    } else { // Print ticket
        return res.render('account/ticket', {
            path: "not-header",
            title: `Ticket ${id}`,
            ticket,
            schedule,
            movie,
            customer,
            room,
            bill
        }
            , (err, html) => {
                if (err) {
                    return;
                } else {
                    const filePath = path.join(__dirname,'..', 'tmp', `${id}.pdf`)
                    console.log(filePath)
                    pdf.create(html, options).toFile(filePath, (err) => {
                        if (err) return res.redirect('/')
                        else {
                            const readTicketFile = fs.readFileSync(filePath)
                            res.header('content-type', 'application/pdf')
                            res.send(readTicketFile)
                        }
                    })
                }
            }
        )
    }

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
    } catch (error) {
        console.log(error.message)
    }


    res.render('account/ticket', {
        ticket,
        schedule,
        movie,
        customer,
        room
    }
        // , (err,html)=>{
        //     pdf.create(html,options).toFile()
        // }
    )
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