const { formatDate, reverseDate } = require("../config/helper")

const { validationResult } = require('express-validator');
const adminNews = require('../models/adminNews.model');

const fs = require('fs'); //doi file name

const adminNewsGet = async (req, res) => {
    try {
        const adminNewsss = await adminNews.handleReadNews();
        // console.log(adminNewsss);

        var resultArray = Object.values(JSON.parse(JSON.stringify(adminNewsss)));
        // console.log(resultArray);
        let context = [];
        resultArray.forEach(result => {
            // console.log(result)
            context = [...context, {
                idtin: result.idtin,
                title: result.title,
                content: result.content,
                day: formatDate(result.day),
                picture_path: result.picture_path
            }]

        })
        // console.log(context)
        res.render('admin/news', { title: 'News', path: "not-header", isAdmin: true, layout: 'admin', routerPath: 'admin/news', context });
    } catch (error) {
        console.log(error);
    }
}

const getNewsDetail = async(req,res) =>{
    let id = req.params.id;
    console.log(id);
    res.render('news/news_detail');
}


const adminNewsPost = async (req, res) => {
    console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const { title,day,content } = req.body
        let image = req.file;
        let imagePath = `public\\images\\news\\${image.originalname}`;
        fs.renameSync(image.path, imagePath);

        try {
            if (await adminNews.handleCreateNews(title,day,content, image.originalname)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Add news successfully!!!!"
                }
                return res.redirect('/admin/news');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/news');
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
        res.redirect('/admin/news');
    }
}

const adminNewsDelPost = async (req, res) => {

    const id = req.body.inputIdDel;
    console.log(id);
    // res.send("ok");
    try {
        if (await adminNews.handleDeleteNews(id)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete news successfully!!!!"
            }
            return res.redirect('/admin/news')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/news')
        }
    } catch (error) {
        console.log(error);
    }
}
const adminNewsEditPost = async (req, res) => {
    // console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);

    if (result.errors.length === 0) {
        const { title,day,content } = req.body
        let image = req.file;
        const id = req.body.inputIdEdit;

        let imageFileName;
        if (image == undefined) {

            try {
                const adminNewsById = await adminNews.handleReadNewsById(id);
                imageFileName = adminNewsById.picture_path
            } catch (error) {
                console.log(error);
            }
        } else {
            let imagePath = `public\\images\\news\\${image.originalname}`;
            fs.renameSync(image.path, imagePath);
            imageFileName = image.originalname;
        }


        try {
            if (await adminNews.handleEditNews(title,day,content, imageFileName, id)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Edit news successfully!!!!"
                }
                return res.redirect('/admin/news');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/news');
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
        res.redirect('/admin/news');
    }
}

module.exports = {
    adminNewsGet,
    getNewsDetail,
    adminNewsPost,
    adminNewsDelPost,
    adminNewsEditPost,
}