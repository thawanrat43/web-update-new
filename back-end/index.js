// var express = require('express')
// var cors = require('cors')
// var app = express()
// require('dotenv').config()
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// var jwt = require('jsonwebtoken');
// const secret ='login-1111'

// const app = express();

// app.use(cors())
// create the connection to database


// app.post('/register',jsonParser, function (req, res, next) {
//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//     connection.execute(
//       'INSERT INTO users(email,password,fname,lname,username,phonenum) VALUES (?, ?, ?, ?, ?, ?)',
//       [req.body.email, hash,req.body.fname,req.body.lname,req.body.username,req.body.phonenum],
//       function(err, results, fields) {
//         if(err) {
//           res.json({status:'error',message:err})
//           return
//         }
//         res.json({status:'OK'})
//       }
//     );
  
//   });
  
  
// })
// app.post('/login',jsonParser, function (req, res, next) {
//   connection.execute(
//     'SELECT *FROM users WHERE email=?',
//     [req.body.email],
//     function(err, users, fields) {
//       if(err) {
//         res.json({status:'error',message:err})
//         return
//       }
//       if(users.length == 0){ res.json({status:'error',message:'no user found'}); return}
//       bcrypt.compare(req.body.password, users[0].password, function(err, islogin) {
//         if(islogin){
//           var token = jwt.sign({ email:users[0].email }, secret,{ expiresIn: '1h' });
//           res.json({status:'ok',message:'login success',token})
//         } else {
//           res.json({status:"error",message:'login falied'})
//         }
//       });
//     }
//   )
// })
// app.use("/home", postRouter);
// app.post('/authen',jsonParser,function(req,res,next){
//   try{
//     const token=req.headers.authorization.split(' ')[1]
//     var decode =jwt.verify(token,secret);
//     res.json({status:'ok',decode})
    
//   }catch(err){
//     res.json({status:'error', message:err.message})
//   }
  
// })
// app.post('/home',jsonParser, function (req, res, next) {
//   try{
//     const token=req.headers.authorization.split(' ')[1]
//     var decode =jwt.verify(token,secret);
//     res.json({status:'ok',decode})
    
//   }catch(err){
//     res.json({status:'error', message:err.message})
//   }
//   connection.execute(
//     'INSERT INTO record(fname,lname,idnumber) VALUES (?, ?, ?, ?)',
//     [req.body.fname,req.body.lname,req.body.idnumber,req.body.type_id],
//     function(err, results, fields) {
//       if(err) {
//         res.json({status:'error',message:err})
//         return
//       }
//       res.json({status:'OK'})
//     }
//   );
// })
// app.get('/profile',jsonParser, function (req, res) {
//   connection.query('SELECT *FROM users WHERE id,email,fname,lname,username',
//     [req.body.id,req.body.email,req.body.fname,req.body.lname,req.body.username],
//     function(err, results, fields) { 
//       res.json(results);
//     }
//   );
// })

// // app.listen(process.env.PROST || 3000)
// app.listen(3333,() => { console.log('Server listening on port 3333')});