const { validationResult } = require('express-validator');
const adminEmployee = require('../models/adminEmployee.model');

const adminEmployeeGet = async (req,res) =>{
    const adminEmployees = await adminEmployee.handleReadEmployee();
    var resultArray = Object.values(JSON.parse(JSON.stringify(adminEmployees)));
    // console.log(resultArray);
    res.render('admin/employee', { title: 'Employee',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/employee' ,resultArray});
}

const adminEmployeePost = async (req,res) =>{
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const { name, phone,gender, role } = req.body
        try {
            if (await adminEmployee.handleCreateEmployee(name, phone,gender,role)){
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Add employee successfully!!!!"
                }
                return res.redirect('/admin/employee')
            }else{
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/employee')
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
        res.redirect('/admin/employee')
    }
    
}

const adminEmployeeDelPost = async(req,res)=>{
    const id =  req.body.inputIdDel;
    console.log(id);
    // res.send("ok");
    try {
        if (await adminEmployee.handleDeleteEmployee(id)){
            req.session.flash = {
                type: "success",
                intro: "Congratulation!",
                message: "Delete employee successfully!!!!"
            }
            return res.redirect('/admin/employee')
        }else{
            req.session.flash = {
                type: "danger",
                intro: "Oops!",
                message: "Some thing went wrong"
            }
            return res.redirect('/admin/employee')
        }
    } catch (error) {
        console.log(error);
    }
}

const adminEmployeeEditPost = async(req,res)=>{
    let result = validationResult(req);
    console.log(result);
    if (result.errors.length === 0) {
        const id = req.body.inputIdEdit;
        const { name, phone,gender, role } = req.body
        console.log(name,phone,gender,role,id);
        try {
            if (await adminEmployee.handleEditEmployee(name, phone,gender,role,id)){
                req.session.flash = {
                    type: "success",
                    intro: "Congratulation!",
                    message: "Edit employee successfully!!!!"
                }
                return res.redirect('/admin/employee')
            }else{
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "Some thing went wrong"
                }
                return res.redirect('/admin/employee')
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
        res.redirect('/admin/employee')
    }
}

module.exports = {
    adminEmployeeGet,
    adminEmployeePost,
    adminEmployeeDelPost,
    adminEmployeeEditPost
}