const { formatDate, reverseDate } = require("../config/helper")

const { validationResult } = require('express-validator');
const adminMovie = require('../models/adminMovies.model');

const fs = require('fs'); //doi file name

const adminMoviesGet = async (req, res) => {
    try {
        const adminNewsss = await adminMovie.handleReadNews();
        // console.log(adminNewsss);

        var resultArray = Object.values(JSON.parse(JSON.stringify(adminNewsss)));
        // console.log(resultArray);
        let context = [];
        resultArray.forEach(result => {
            // console.log(result)
            context = [...context, {
                idphim: result.idphim,
                title: result.title,
                overview: result.overview,
                vote_average: result.vote_average,
                release_date: formatDate(result.release_date),
                poster_path: result.poster_path,
                duration: result.duration
            }]

        })
        // console.log(context)
        res.render('admin/movies', { title: 'Movies',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/movies',context });
    } catch (error) {
        console.log(error);
    }
}



const adminMoviesPost = async (req, res) => {
    console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const { title,overview,vote_average,release_date,duration } = req.body
        let image = req.file;
        let imagePath = `public\\images\\poster\\${image.originalname}`;
        fs.renameSync(image.path, imagePath);

        try {
            if (await adminMovie.handleCreateNews(title,overview,vote_average,release_date,image.originalname,duration)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Add movie successfully!!!!"
                }
                return res.redirect('/admin/movies');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/movies');
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
        res.redirect('/admin/movies');
    }
}

const adminMoviesDelPost = async (req, res) => {

    const id = req.body.inputIdDel;
    console.log(id);
    // res.send("ok");
    try {
        if (await adminMovie.handleDeleteNews(id)) {
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete movies successfully!!!!"
            }
            return res.redirect('/admin/movies')
        } else {
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/movies')
        }
    } catch (error) {
        console.log(error);
    }
}
const adminMoviesEditPost = async (req, res) => {
    // console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);

    if (result.errors.length === 0) {
        const { title,overview,vote_average,release_date,duration } = req.body
        let image = req.file;
        const id = req.body.inputIdEdit;

        let imageFileName;
        if (image == undefined) {

            try {
                const adminNewsById = await adminMovie.handleReadNewsById(id);
                imageFileName = adminNewsById.picture_path
            } catch (error) {
                console.log(error);
            }
        } else {
            let imagePath = `public\\images\\poster\\${image.originalname}`;
            fs.renameSync(image.path, imagePath);
            imageFileName = image.originalname;
        }


        try {
            if (await adminMovie.handleEditNews(title,overview,vote_average,release_date, imageFileName,duration, id)) {
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Edit movies successfully!!!!"
                }
                return res.redirect('/admin/movies');
            } else {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/movies');
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
        res.redirect('/admin/movies');
    }
}

module.exports = {
    adminMoviesGet,
    adminMoviesPost,
    adminMoviesDelPost,
    adminMoviesEditPost,
}