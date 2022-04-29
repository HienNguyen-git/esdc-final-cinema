const connect = require('../database/db');

const handleReadEmployee = () => new Promise((resolve,reject)=>{
    const sql = 'SELECT * FROM employee';
    connect.query(sql,[],(err,result)=>{
        if(err) reject(false);
        else{
            const employee = result;
            resolve(employee);
        }
    })
})


const handleCreateEmployee = (name,phone,gender,role) => new Promise((resolve,reject)=>{
    const sql = 'INSERT INTO employee(name,phone,gender,role) values(?,?,?,?)';
    const value = [name,phone,gender,role];
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleDeleteEmployee = (id) => new Promise((resolve,reject)=>{
    const sql = 'DELETE FROM employee WHERE idnv = ?';
    const value = id;
    connect.query(sql,value,(err)=>{
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

const handleEditEmployee = (name,phone,gender,role,id) => new Promise((resolve,reject)=>{
    const sql = 'UPDATE employee SET name = ?,phone = ?,gender = ?,role = ? WHERE idnv = ?';
    const value = [name,phone,gender,role,id];
    connect.query(sql,value,(err,result)=>{
        // console.log(value);
        // console.log(result);
        if(err) reject(false);
        else{
            resolve(true);
        }
    })
})

module.exports = {
    handleReadEmployee,
    handleCreateEmployee,
    handleDeleteEmployee,
    handleEditEmployee
}