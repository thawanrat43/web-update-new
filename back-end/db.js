// const mysql = require('mysql2');
// // create the connection to database
// const db = mysql.createConnection({
//     host:"localhost",
//     user: "root",
//     password:"",
//     database:"",
// });
// module.exports = db
const util = require('util')
var mysql = require('mysql2')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'check_database'
});
pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
  }
  
    if (connection) connection.release()
      return console.log('ok')
})
  // Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)
  
module.exports = pool
// module.exports ={
    
//     dialect:"mysql",
//     pool:{
//         max: 5,
//         min: 0,
//         acqire: 30000,
//         idle: 10000
//     }
// }
// const mysql = require('mysql2');
// // create the connection to database
// const connection = mysql.createConnection(process.env.DATABASE_URL)