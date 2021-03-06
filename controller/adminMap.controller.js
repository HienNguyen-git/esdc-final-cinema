const { sleep } = require("../config/helper")
const { validationResult } = require('express-validator');
const adminMap = require("../models/adminMap.model");

const getMapList = async (req,res)=>{
    let mapList =[]
    try {
        const mapListRaw = await adminMap.handleGetMapList();
        mapList = mapListRaw.map(e=>({
            id: e.id,
            numrow: e.numrow,
            numcolumn: e.numcolumn
        }))


    } catch (error) {
        console.error(error.message)
    }
    sleep(100)
    res.render('admin/map', { title: 'Blueprint',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/map', mapList});
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

const adminMapDelPost = async (req, res) => {
    const id = req.body.inputIdDel;
    console.log(id);
    try {
        if (await adminMap.handleDeleteRoomById(id)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete map successfully!!!!"
            }
            return res.redirect('/admin/map')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/map')
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
    getMapList,
    adminMapPost,
    adminMapDelPost,
    adminMapEditPost
}