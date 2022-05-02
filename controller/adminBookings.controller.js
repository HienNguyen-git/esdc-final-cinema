const { sleep, formatDate } = require("../config/helper")
const adminBookings = require("../models/adminBookings.model");
const { validationResult } = require('express-validator');


const adminBookingsGet = async (req,res)=>{
    let bookingsList =[]
    try {
        const bookingsListRaw = await adminBookings.handleGetBookingsList();
        // console.log(bookingsListRaw);
        bookingsList = bookingsListRaw.map(e=>({
            idve: e.idve,
            price: e.price,
            idkh: e.idkh,
            seat: e.seat,
            start: e.start,
            day: formatDate(e.day),
            title: e.title,
            name: e.name,
            poster_path: e.poster_path

        }))
        // console.log(bookingsList);


    } catch (error) {
        console.error(error.message)
    }
    sleep(100)
    res.render('admin/bookings', { title: 'Bookings',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/bookings',bookingsList });
}

const adminMapPost = async (req, res) => {
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const { rowNum,colNum } = req.body
        try {
            if (await adminMap.createNewMap(rowNum,colNum)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Add map successfully!!!!"
                }
                return res.redirect('/admin/map');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/map');
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        const errors = result.mapped()
        let errorMessage = errors[Object.keys(errors)[0]].msg
        req.session.flash = {
            type: "danger",
            intro: "Oops!",
            message: errorMessage
        }
        res.redirect('/admin/map');
    }
}

const adminBookingDelPost = async (req, res) => {
    const id = req.body.inputIdDel;
    console.log(id);
    try {
        if (await adminBookings.handleDeleteRoomById(id)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete bookings successfully!!!!"
            }
            return res.redirect('/admin/bookings')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/bookings')
        }
    } catch (error) {
        console.log(error);
    }
}

const adminMapEditPost = async (req, res) => {
    // console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);

    if (result.errors.length === 0) {
        const { rowNum,colNum } = req.body
        const id = req.body.inputIdEdit;

        try {
            if (await adminMap.handleEditRoom(rowNum,colNum, id)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Edit map successfully!!!!"
                }
                return res.redirect('/admin/map');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/map');
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        const errors = result.mapped()
        let errorMessage = errors[Object.keys(errors)[0]].msg
        req.session.flash = {
            type: "danger",
            intro: "Oops!",
            message: errorMessage
        }
        res.redirect('/admin/map');
    }
}

module.exports = {
    adminBookingsGet,
    adminMapPost,
    adminBookingDelPost,
    adminMapEditPost
}