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


const handleCreateEmployee = () => new Promise((resolve,reject)=>{
    const sql = 'INSERT * INTO employee(name,phone,gender,role) values(?,?,?,?)';
    connect.query(sql,[],(err,result)=>{
        if(err) reject(false);
        else{
            const employee = result;
            resolve(true);
        }
    })
})

module.exports = {
    handleReadEmployee
}