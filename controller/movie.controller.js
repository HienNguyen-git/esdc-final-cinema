const { connect } = require("../database/db");


const getMovieList = ()=> new Promise((resolve,reject)=>{
    connect.query("select * from movietable",(err,results)=>{
        if(err) reject(err.message)
        resolve(results)
    })
})

const getMovieByID = (id)=>new Promise((resolve,reject)=>{
    connect.query("select * from movietable where id=?",[id],(err,results)=>{
        if(err) reject(err.message)
        resolve(results[0])
    })
})
module.exports = {

}