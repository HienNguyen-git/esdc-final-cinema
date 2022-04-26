const {HOST,ACCESS_USER,PASSWORD,DATABASE} = process.env
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : HOST,
  user     : ACCESS_USER,
  password : PASSWORD,
  database : DATABASE
});
 
connection.connect();
 
module.exports = connection