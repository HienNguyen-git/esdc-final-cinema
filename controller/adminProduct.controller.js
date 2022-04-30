const { validationResult } = require('express-validator');
const adminProduct = require('../models/adminProduct.model');

const multer  = require('multer')
const upload = multer({ dest: 'public/images/popcorn' })
// const bodyParser = require('body-parser'); // xử form dữ liệu
// router.use(bodyParser.urlencoded({extended: false})); //form

const fs = require('fs'); //doi file name
// const upload = multer({dest:'/images/popcorn'}) //nơi upload file
// fileFilter: (req,file,callback) =>{
//     // console.log(file);
//     if(file.mimetype.startsWith('image/')){ //chỉ cho ảnh
//         callback(null,true);
//     }else callback(null,false);
// },limits:{fileSize:500000}});

const adminProductGet = async (req,res) =>{
    try {
        const adminEmployees = await adminProduct.handleReadProduct();
        var resultArray = Object.values(JSON.parse(JSON.stringify(adminEmployees)));
        // console.log(resultArray);
        res.render('admin/product', { title: 'Product',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/product' ,resultArray});
    } catch (error) {
        console.log(error);
    }
}

const adminProductPost = async (req,res)  =>{
    console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const { name, price } = req.body
        let image = req.file;
        let imagePath = `public\\images\\popcorn\\${image.originalname}`; 
        fs.renameSync(image.path,imagePath);

        try {
            if (await adminProduct.handleCreateProduct(name, price, image.originalname)){
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Add employee successfully!!!!"
                }
                return res.redirect('/admin/product');
            }else{
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/product');
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
        res.redirect('/admin/product');
    }
}

module.exports ={
    adminProductGet,
    adminProductPost
}