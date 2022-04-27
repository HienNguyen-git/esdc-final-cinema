const {HOST,ACCESS_USER,PASSWORD,DATABASE} = process.env
const mysql = require('mysql');
const connect = mysql.createConnection({
  host     : HOST,
  user     : ACCESS_USER,
  password : PASSWORD,
  database : DATABASE
});
 
connect.connect();



module.exports = connect