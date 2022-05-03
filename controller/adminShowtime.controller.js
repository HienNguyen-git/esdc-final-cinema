const { sleep, formatDate } = require("../config/helper")
const { validationResult } = require('express-validator');
const adminShowtime = require("../models/adminShowtime.model");

const adminGetShowtime = async (req,res)=>{
    let mapList =[]
    try {
        const mapListRaw = await adminShowtime.handleGetMapList();
        //console.log(mapListRaw)
        mapList = mapListRaw.map(e=>({
            idsuatchieu: e.idsuatchieu,
            start: e.start,
            day: formatDate(e.day),
            idphim: e.idphim,
            idphongchieu: e.idphongchieu,
            seatmap: e.seatmap.length - 2
        }))
        //console.log(mapList)


    } catch (error) {
        console.error(error.message)
    }
    sleep(100)
    res.render('admin/showtime', { title: 'Showtime',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/showtime', mapList});
}

const adminShowtimePost = async (req, res) => {
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const { start,day,idphim,idphongchieu } = req.body
        console.log(start,day,idphim,idphongchieu);
        try {
            if (await adminShowtime.createNewMap(start,day,idphim,idphongchieu)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Add showtime successfully!!!!"
                }
                return res.redirect('/admin/showtime');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/showtime');
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
        res.redirect('/admin/showtime');
    }
}

const adminShowtimeDelPost = async (req, res) => {
    const id = req.body.inputIdDel;
    console.log(id);
    try {
        if (await adminShowtime.handleDeleteRoomById(id)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete showtime successfully!!!!"
            }
            return res.redirect('/admin/showtime')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/showtime')
        }
    } catch (error) {
        console.log(error);
    }
}

const adminShowtimeEditPost = async (req, res) => {
    // console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);

    if (result.errors.length === 0) {
        const { start,day,idphim,idphongchieu } = req.body
        const idsuatchieu = req.body.inputIdEdit;
        console.log(start,day,idphim,idphongchieu,idphongchieu)
        try {
            if (await adminShowtime.handleEditRoom(start,day,idphim,idphongchieu, idsuatchieu)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Edit showtime successfully!!!!"
                }
                return res.redirect('/admin/showtime');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/showtime');
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
        res.redirect('/admin/showtime');
    }
}

module.exports = {
    adminGetShowtime,
    adminShowtimePost,
    adminShowtimeDelPost,
    adminShowtimeEditPost
}