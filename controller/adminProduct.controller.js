const { validationResult } = require('express-validator');
const adminProduct = require('../models/adminProduct.model');

const fs = require('fs'); //doi file name

const adminProductGet = async (req,res) =>{
    try {
        const adminProducts = await adminProduct.handleReadProduct();
        var resultArray = Object.values(JSON.parse(JSON.stringify(adminProducts)));
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
                    message: "Add product successfully!!!!"
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

const adminProductDelPost = async(req,res)=>{
    
    const id =  req.body.inputIdDel;
    console.log(id);
    // res.send("ok");
    try {
        if (await adminProduct.handleDeleteProduct(id)){
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete product successfully!!!!"
            }
            return res.redirect('/admin/product')
        }else{
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/product')
        }
    } catch (error) {
        console.log(error);
    }
}
const adminProductEditPost = async(req,res)=>{
    // console.log(req.file, req.body);
    let result = validationResult(req);
    console.log(result);
    
    if (result.errors.length === 0) {
        const { name, price } = req.body
        let image = req.file;
        const id = req.body.inputIdEdit;
        
        let imageFileName;
        if(image == undefined){

            try {
                const adminProductById = await adminProduct.handleReadProductById(id);
                imageFileName = adminProductById.picture_path
            } catch (error) {
                console.log(error);
            }
        }else{
            let imagePath = `public\\images\\popcorn\\${image.originalname}`; 
            fs.renameSync(image.path,imagePath);
            imageFileName = image.originalname;
        }
        

        try {
            if (await adminProduct.handleEditProduct(name, price, imageFileName,id)){
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Edit product successfully!!!!"
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
    adminProductPost,
    adminProductDelPost,
    adminProductEditPost,
}