const { formatDate, reverseDate } = require("../config/helper")

const { validationResult } = require('express-validator');
const adminRoom = require('../models/adminRoom.model');

const fs = require('fs'); //doi file name

const adminGetRooms = async (req, res) => {
    try {
        const adminRooms = await adminRoom.getRoomList();

        var resultArray = Object.values(JSON.parse(JSON.stringify(adminRooms)));
        // console.log(resultArray);
        let context = [];
        resultArray.forEach(result => {
            // console.log(result)
            context = [...context, {
                idphongchieu: result.idphongchieu,
                name: result.name,
                idmap: result.idmap,
            }]
        })
        // console.log(context)
        res.render('admin/room', { title: 'News', path: "not-header", isAdmin: true, layout: 'admin', routerPath: 'admin/rooms', context });
    } catch (error) {
        console.log(error);
    }
}

const adminRoomsPost = async (req, res) => {
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const { name,idmap } = req.body
        try {
            if (await adminRoom.createNewRoom(name,idmap)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Add room successfully!!!!"
                }
                return res.redirect('/admin/rooms');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/rooms');
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
        res.redirect('/admin/rooms');
    }
}

const adminRoomsDelPost = async (req, res) => {
    const id = req.body.inputIdDel;
    console.log(id);
    try {
        if (await adminRoom.handleDeleteRoomById(id)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete room successfully!!!!"
            }
            return res.redirect('/admin/rooms')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/rooms')
        }
    } catch (error) {
        console.log(error);
    }
}

const adminRoomsEditPost = async (req, res) => {
    // console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);

    if (result.errors.length === 0) {
        const { name,idmap } = req.body
        const id = req.body.inputIdEdit;

        try {
            if (await adminRoom.handleEditRoom(name,idmap, id)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Edit room successfully!!!!"
                }
                return res.redirect('/admin/rooms');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/rooms');
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
        res.redirect('/admin/rooms');
    }
}


module.exports = {
    adminGetRooms,
    adminRoomsPost,
    adminRoomsDelPost,
    adminRoomsEditPost
}