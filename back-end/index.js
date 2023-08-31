var express = require('express');
var cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
// const db  = require('../db.js')
// app.use(express.json());
require('dotenv').config()
var cors = require('cors');
// require('dotenv').config()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const multer = require('multer')
const fs =require('fs')
const mysql = require('mysql2');
// create the connection to database
// const connection = require('./db')
const connection =mysql.createConnection(process.env.DATABASE_URL)
const sessions = require('express-session');
// const { result } = require('lodash');
// const router = express.Router();
// const morgan = require('morgan');
const path =require('path');
var session;
const upload = multer({dest: 'uploads/'});
// create application/json parser
app.use(cookieParser());
// parse application/json
// app.use(cors())
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["POST","GET"],
  credentials:true
}));
app.use(sessions({
  secret : 'session_secret',
  resave:false,
  saveUninitialized : false,
  cookie :{
    secure:false,
    maxAge : 1000*60*60*24
  }
}))
app.use(express.json())
app.use(express.static('uploads'));
const Notlogin =(req,res ,next )=>{
  if (!req.session.islogin){
    return res.render('/login')
  }
}
const Islogin =(req,res ,next )=>{
  if (req.session.islogin){
    return res.render('/home')
  }
}
app.get('/',Notlogin, (req,res,next) => {
  connection.execute('SELECT username FROM users WHERE id=?',[req.session.userid])
    .than(([rows]) => {
      res.render('profile'),{
        name:rows[0].name
      }
    })
})
// app.use("/api/login",loginRoutes);
app.post('/register', function (req, res, next) {
  const img = 'user-6820232_640.webp';
  const status = '1';
  const statusadmin = '';
  connection.query("SELECT username FROM users WHERE username = ?", [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(409).json("User already exists!");
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      connection.execute(
        'INSERT INTO users(email,password,fname,lname,username,phonenum,status,statusadmin,profilepic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.email, hash,req.body.fname,req.body.lname,req.body.username,req.body.phonenum,status,statusadmin,img],
        function(err, results, fields) {
          if (err) return res.status(500).json(err);
          return res.status(200).json("User has been created.");


        }
      );
    
    });
  });
})

app.post('/login',jsonParser, function (req, res, next) {
  try{
    connection.query('SELECT * FROM users WHERE email=?',[req.body.email],
    function(err, users) {
      if(err) {
        return res.status(400).json("no user found");
       
      }
      if(users.length > 0){
          bcrypt.compare(req.body.password, users[0].password, function(err, islogin) { 
            if(err){
              console.log(req.body.password)
              return res.status(400).json('wrong password');
            }
            if(islogin) {
              session = req.session;
              session.userid = users[0].id;
              req.session.islogin = true;
              console.log(req.session)
              const token = jwt.sign({ id :users[0].id}, 'secret_token111');
              return res
                .cookie("access_token", token, {
                  httpOnly: true,
                  
                })
                .status(200)
                .json(users[0].password);
                
              
            }else{
              return res.json({status : 'Error'})
            }

            
          });
        }
      }
    )
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
  
})
app.get('/profile/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT username,lname,fname,email,phonenum,profilepic,id  FROM users WHERE id=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.post('/code/:id',function (req, res, next) {
  const userid = req.params.id; 
  const {oldpassword ,newpassword,conpassword} =req.body;
  try{
    connection.query("SELECT password FROM users WHERE id=? ",[userid],(err,data) =>  {
      if(data){ 
        bcrypt.compare(oldpassword,data[0].password, function(err,isPassword) { 
          if(err){
            return res.status(400).json('wrong password');
          }
          if(isPassword) {
            if(conpassword==newpassword){
              bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                if(err){
                  return res.status(400).json('update error');
                }
                connection.query("UPDATE users SET password= ? WHERE id=? ",[hash,userid],(err,updatedata) =>  {
                  if (err) return res.send(err);
                  return res.json(updatedata);
                })
              })
            }
            else{
              return res.status(400).json('Password is not the same');
            }
            
            
          } 
        })
      }
      if(err){
        return res.status(400).json('Error');
      }
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
});

app.get('/image/:id',upload.single('file'),function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT profilepic FROM users WHERE id=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.post('/profileupdate/:id',function (req, res, next) {
  const userid = req.params.id;
  try{
    connection.query("UPDATE users SET username=?,fname=?,lname=?,phonenum=? ,profilepic= ? WHERE id=? ",[req.body.username,req.body.fname,req.body.lname,req.body.phonenum,req.body.profilepic,userid],(err,updatedata) =>  {
      if (err) return res.send(err);
      return res.json(updatedata);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});
const uploads =multer({
  storage: storage
})
app.post('/updatepic/:id',uploads.single('file'),function (req, res, next){
  console.log(req.file)
  try {
      // code
      const userid = req.params.id
      connection.query("UPDATE users SET profilepic= ? WHERE id=? ",[req.file.filename,userid],(err,updatedata) =>  {
        if (err) return res.send(err);
        return res.json(updatedata);
      })
      // const updated = await Product
      //     .findOneAndUpdate({ _id: id }, newData, { new: true })
      //     .exec()

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.get('/profileid',  function (req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token,'secret_token111', (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    else{
      connection.query("SELECT * FROM users WHERE id = ?", [userInfo.id], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      })
     
    }
  })
})
app.post('/home', function (req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token,'secret_token111', (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    else{
      const pay_id = 'ยังไม่ชำระเงิน';
      connection.query("SELECT * FROM users WHERE id = ?", [userInfo.id], (err, data) => {
        if (err) return res.send(err);
        else{
          connection.execute("INSERT INTO history(fname,lname,idcard,userid,type_id,criminal,bankrupt,credit,penalty,global,other_text,pay) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [req.body.fname,req.body.lname,req.body.idcard,data[0].id,req.body.type_id,req.body.criminal,req.body.bankrupt,req.body.credit,req.body.penalty,req.body.global,req.body.other_text,pay_id],
            function(err, results, fields) {
              if(err) {
                res.json({status:'error',message:err})
                return
              }
                return res.json(results);
            }
            
          )
            
         
        }
      })
      
     
    }
  })
  
  
   
      

})
app.post('/idhistory',function (req, res, next){
  try {
      
      connection.query("SELECT * FROM history WHERE fname = ? AND lname = ? " ,[req.body.fname,req.body.lname],(err,deletedata) =>  {
        if (err) return res.send(err);
        return res.json(deletedata);
      })

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.post('/homes/:id', function (req, res, next) {
  const userid = req.params.id;
  connection.execute("INSERT INTO history(fname,lname,userid) VALUES (?)",
  [req.body.fname,req.body.lname,userid],
      function(err, results, fields) {
        if(err) {
          res.json({status:'error',message:err})
          return
        }
        return res.json(results);
      }
  )
})
app.post('/adminregister', function (req, res, next) {
  const img = 'user-6820232_640.webp';
  connection.query("SELECT username FROM users WHERE username = ?", [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(409).json("User already exists!");
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      connection.execute(
        'INSERT INTO users(email,password,fname,lname,username,phonenum,status,statusadmin,profilepic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.email, hash,req.body.fname,req.body.lname,req.body.username,req.body.phonenum,req.body.status,req.body.statusadmin,img],
        function(err, results, fields) {
          if (err) return res.status(500).json(err);
          return res.status(200).json("User has been created.");


        }
      );
    
    });
  });
  
})
app.get('/adminuser',function (req,res,next){
  try{
    connection.execute("SELECT username,lname,fname,email,phonenum,profilepic,id  FROM users",(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})

app.post('/admindelete/:id',function (req, res, next){
  try {
      const userid =req.params.id;
      connection.query("DELETE FROM users WHERE `id`=? ",[userid],(err,deletedata) =>  {
        if (err) return res.send(err);
        return res.json(deletedata);
      })

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})

app.get('/pagestatus/:id',upload.single('file'),function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT lname,fname,type_id,pay,idcard,idhistory  FROM history WHERE userid=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})

app.post('/adminhistory/:id', function (req, res, next) {
  const userid = req.params.id;
  connection.execute("INSERT INTO historydetails(id,birthday,father,mother,religion,criminal,bankrupt,credit,penalty,global,other) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [userid,req.body.birthday,req.body.father,req.body.mother,req.body.religion,req.body.criminal,req.body.bankrupt,req.body.credit,req.body.penalty,req.body.global,req.body.other],
      function(err, results, fields) {
        if(err) {
          res.json({status:'error',message:err})
          return
        }
        return res.json(results);
      }
  )
})
app.get('/historyselect/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT criminal,bankrupt,credit,penalty,global,other_text FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})

app.post('/pay/:id',function (req, res, next){
  const statuspay ="กำลังตรวจสอบการชำระเงิน";
  try {
 
      const userid = req.params.id
      connection.query("UPDATE history SET pay= ? WHERE idhistory=? ",[statuspay,userid],(err,updatedata) =>  {
        if (err) return res.send(err);
        return res.json(updatedata);
      })
  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.get('/finish/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT pay FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/historydetail/:id',function (req, res, next) {
  const userid = req.params.id;
  try{
    connection.execute("SELECT birthday,father,mother,religion,criminal,bankrupt,credit,penalty,global,other FROM historydetails WHERE id=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/history/:id',upload.single('file'),function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT lname,fname,type_id,idcard  FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/profilehistory/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT userid FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      connection.execute("SELECT * FROM users WHERE id=? ",[data[0].userid],(err,imgdata) =>  {
        if (err) return res.send(err);
        return res.json(imgdata);
          
      })
      
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get("/", (req, res) => {
  // server จะสามารถส่งทั้ง header ต่างๆหรือจะตัวหนังสือ json อะไรก็ได้กลับไป
  res.send("Hello World");
});
// const checkcookie = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return res.sendStatus(403);
//   }
//   try {
//     const data = jwt.verify(token, "YOUR_SECRET_KEY");
//     req.userId = data.id;
//     req.userRole = data.role;
//     return next();
//   } catch {
//     return res.sendStatus(403);
//   }
// };
// app.get("/setCookies",(req, res) => {
//   return res.json({ user: { id: req.useId, role: req.userRole} });
//   // const token = 'seentoken'
//   // console.log(token);
//   //   res.cookie('jwt', token, {
//   //   expires: new Date(Date.now() +50000),
//   //   ttpOnly: true,
//   //               //secure :true,
//   //   });
//   // console.log(req.cookies.jwt);

//   // res.end();
// });



// app.listen(process.env.PROST || 3000)
app.listen(3333,()=>{
  console.log("server start")
})
