const { formatDate, reverseDate } = require("../config/helper")

const { validationResult } = require('express-validator');
const adminPromotion = require('../models/adminPromotion.model');

const fs = require('fs'); //doi file name

const adminPromotionGet = async (req, res) => {
    try {
        const adminPromote = await adminPromotion.handleReadPromotion();
        // console.log(adminPromote);

        var resultArray = Object.values(JSON.parse(JSON.stringify(adminPromote)));
        // console.log(resultArray);
        let context = [];
        resultArray.forEach(result => {
            // console.log(result)
            context = [...context, {
                idtin: result.idkm,
                title: result.title,
                content: result.content,
                day: formatDate(result.day),
                note: result.note,
                picture_path: result.picture_path
            }]

        })
        // console.log(context)
        res.render('admin/promotion', { title: 'Promotion', path: "not-header", isAdmin: true, layout: 'admin', routerPath: 'admin/promotion', context });
    } catch (error) {
        console.log(error);
    }
}

const getPromotionDetail = async(req,res) =>{
    // let id = req.params.id;
    const id = req.query['id'];
    // console.log(id);
    const data = await adminPromotion.handleReadPromotionById(id);
    // console.log(data.title);
    res.render('promotion/promotion_detail',{data});
}


const adminPromotionPost = async (req, res) => {
    console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const { title,day,content,note } = req.body
        let image = req.file;
        let imagePath = `public\\images\\promotion\\${image.originalname}`;
        fs.renameSync(image.path, imagePath);

        try {
            if (await adminPromotion.handleCreatePromotion(title,day,content,note, image.originalname)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Add promotion successfully!!!!"
                }
                return res.redirect('/admin/promotion');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/promotion');
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
        res.redirect('/admin/promotion');
    }
}

const adminPromotionDelPost = async (req, res) => {

    const id = req.body.inputIdDel;
    console.log(id);
    // res.send("ok");
    try {
        if (await adminPromotion.handleDeletePromotion(id)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete promotion successfully!!!!"
            }
            return res.redirect('/admin/promotion')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/promotion')
        }
    } catch (error) {
        console.log(error);
    }
}
const adminPromotionEditPost = async (req, res) => {
    // console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);

    if (result.errors.length === 0) {
        const { title,day,content,note } = req.body
        let image = req.file;
        const id = req.body.inputIdEdit;

        let imageFileName;
        if (image == undefined) {

            try {
                const adminNewsById = await adminPromotion.handleReadPromotionById(id);
                imageFileName = adminNewsById.picture_path
            } catch (error) {
                console.log(error);
            }
        } else {
            let imagePath = `public\\images\\promotion\\${image.originalname}`;
            fs.renameSync(image.path, imagePath);
            imageFileName = image.originalname;
        }


        try {
            if (await adminPromotion.handleEditPromotion(title,day,content,note, imageFileName, id)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Edit promotion successfully!!!!"
                }
                return res.redirect('/admin/promotion');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/promotion');
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
        res.redirect('/admin/promotion');
    }
}

module.exports = {
    adminPromotionGet,
    getPromotionDetail,
    adminPromotionPost,
    adminPromotionDelPost,
    adminPromotionEditPost,
}