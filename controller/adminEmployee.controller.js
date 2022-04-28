const { validationResult } = require('express-validator');
const adminEmployee = require('../models/adminEmployee.model');

const adminEmployeeGet = async (req,res) =>{
    const adminEmployees = await adminEmployee.handleReadEmployee();
    var resultArray = Object.values(JSON.parse(JSON.stringify(adminEmployees)));
    // console.log(resultArray);
    res.render('admin/employee', { title: 'Employee',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/employee' ,resultArray});
}

const adminEmployeePost = async (req,res) =>{
    const adminEmployees = await adminEmployee.handleReadEmployee();
    var resultArray = Object.values(JSON.parse(JSON.stringify(adminEmployees)));
    // console.log(resultArray);
    res.render('admin/employee', { title: 'Employee',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/employee' ,resultArray});
}

module.exports = {
    adminEmployeeGet
}