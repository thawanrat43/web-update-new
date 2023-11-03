var express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
// const db  = require('../db.js')
// app.use(express.json());
require('dotenv').config()
// require('dotenv').config()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const multer = require('multer')

const mysql = require('mysql2');
const nodemailer = require("nodemailer");
// create the connection to database
// const connection = require('./db')
// const { process } = require('ipaddr.js');
const connection = mysql.createConnection(process.env.DATABASE_URL)
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'check_database'
// });
// const { result } = require('lodash');
// const router = express.Router();
// const morgan = require('morgan');
const path =require('path');
const otpGenerator = require('otp-generator');
const { userInfo } = require('os');
var session;
const upload = multer({dest: 'uploads/'});
const imgpay = multer({dest: 'imgpay/'});
// create application/json parser
app.use(cookieParser());
// parse application/json
// const whitelist = [ 'https://lambent-donut-b06776.netlify.app'];

// var corsOptions = {
//   credentials: true,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));
// app.use(cors());
// const API_URL ='http://localhost:3000'
// const proxyOptions = {
//   target: API_URL,
//   changeOrigin: true,
//   pathRewrite: {
//       [`^/api/posts`]: '/posts',
//   },
// }

// const proxy = createProxyMiddleware(proxyOptions);
// http://lambent-donut-b06776.netlify.app
// https://64f7ff2936356b307e42dcee--venerable-axolotl-d1d4fd.netlifye4s.app
app.use(cors({
  origin: ["https://65407bdfdde71c4b54c5b20d--stately-cupcake-1c1083.netlify.app","http://localhost:3000","https://654476ce5636ae40e9ffcdf5--super-croquembouche-d3c0d8.netlify.app","https://650291076cfc3a12da215377--deft-gaufre-e9ad20.netlify.app","https://654471ce5636ae3cdfffd223--bright-caramel-220f17.netlify.app","https://6544729d20f77c3f5d78f944--gentle-dasik-8d4dd1.netlify.app","https://654477e3bf589d4302e23255--leafy-lebkuchen-bcad3a.netlify.app","https://654479bb5636ae426dffcf31--jazzy-gnome-845f28.netlify.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
// const corsOptions ={
//     origin: ['https://64f5bb2ad019ec2e9a3744c9--grand-dolphin-262897.netlify.app/'], 
//     credentials:true,            
//     maxAge: 3600
// }
// app.use(cors(corsOptions));
// app.use(cors({
//   origin:"http://localhost:3000",
//   credentials :true
// }));
// var allowlist = ['http://example1.com', 'http://example2.com']
// var corsOptionsDelegate = function (req, callback) {
//   credentials :true
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
// app.use(cors(corsOptionsDelegate))
// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin", "https://lambent-donut-b06776.netlify.app");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
//   res.setHeader("Access-Control-Max-Age", "3600");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Cache-Control, X-Requested-With");
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   next();
// })
// app.use(sessions({
//   secret : 'session_secret',
//   resave:false,
//   saveUninitialized : false,
//   cookie :{
//     secure:false,
//     maxAge : 1000*60*60*24
//   }
// }))
app.use(express.json())
app.use(express.static('uploads'));

// const Notlogin =(req,res ,next )=>{
//   if (!req.session.islogin){
//     return res.render('/login')
//   }
// }
// const Islogin =(req,res ,next )=>{
//   if (req.session.islogin){
//     return res.render('/home')
//   }
// }
// app.get('/',Notlogin, (req,res,next) => {
//   connection.execute('SELECT username FROM users WHERE id=?',[req.session.userid])
//     .than(([rows]) => {
//       res.render('profile'),{
//         name:rows[0].name
//       }
//     })
// })
// app.use("/api/login",loginRoutes);
app.get("/", (req, res) => {
  // server จะสามารถส่งทั้ง header ต่างๆหรือจะตัวหนังสือ json อะไรก็ได้กลับไป
  res.send("Hello World");
});
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.post('/register', function (req, res, next) {
  const img = 'user-6820232_640.webp';
  const status = '1';
  const statusadmin = '';
  connection.query("SELECT username FROM users WHERE username = ?", [req.body.username], (err, data) => {
    if (err) return res.status(500).json("This username already exists.");
    if (data.length > 0) 
        return res.status(500).json("This username already exists.");
    else{
      connection.query("SELECT email FROM users WHERE email = ?", [req.body.email], (err, data) => {
        if (err) return res.status(500).json("This E-mail already exists.");
        if (data.length > 0) 
          return res.status(500).json("This E-mail already exists.");
        else{
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const date = new Date()
            const result = date.toLocaleString('th-TH')
            connection.execute(
              'INSERT INTO users(email,password,fname,lname,username,phonenum,status,statusadmin,profilepic,createdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [req.body.email, hash,req.body.fname,req.body.lname,req.body.username,req.body.phonenum,status,statusadmin,img,result],
              function(err, results, fields) {
                if (err) return res.status(500).json(err);
                return res.status(200).json("User has been created.");
    
    
              }
            );
          
          });
        }
        
      })
    }
    
    
  });
})
const otpsend = ()=>{
  
}
app.post('/login', function (req, res, next) {
  try{
    connection.query('SELECT * FROM users WHERE email=?',[req.body.email],
    function(err, users) {
      if(err) {
        return res.status(500).json("no user found");
       
      }
      if(users.length > 0){
          bcrypt.compare(req.body.password, users[0].password, function(err, islogin) { 
            if(err){
              console.log(req.body.password)
              return res.status(500).json('wrong password');
            }
            if(islogin) {
              const token = jwt.sign({ id :users[0].email},process.env.TOKEN_KEY,{expiresIn:"2h"});
              const status = users[0].status;
              console.log(status)
              
              const otp = otpGenerator.generate(6, {
                upperCaseAlphabets: true,
                specialChars: false,
              });
              console.log(otp)
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: 'seen6083@gmail.com', // your email
                  pass: 'zeyxuvkqffsvanhh' // your email password
                }
              });
              let mailOptions = {
                from: 'seen6083@gmail.com',                
                to: 'thawanrat.so@ku.th',                
                subject: "OTP form Callback Coding",
                text: `Your OTP is: ${otp}`,  
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log(info);
                  console.log("Email sent successfully!");
                  bcrypt.hash(otp, saltRounds, function(err, hasheotp) {
                    if(err){
                      return res.status(403).json("error");
                    }else{
                      console.log(hasheotp)
                      connection.query("UPDATE users SET OTP= ? WHERE email=? ",[hasheotp,req.body.email],(err,updatedata) =>  {
                        if (err) return res.send(err);
                        return res.json({message:'login success',token})
                      })
                    }
                    
                  });
                }
              });
              
            }else{
              return res.status(500).json('wrong password');
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
    connection.execute("SELECT *  FROM users WHERE id=? ",[userid],(err,data) =>  {
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
            return res.status(500).json('wrong password');
          }
          if(isPassword) {
            if(conpassword==newpassword){
              bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                if(err){
                  return res.status(500).json('update error');
                }
                connection.query("UPDATE users SET password= ? WHERE id=? ",[hash,userid],(err,updatedata) =>  {
                  if (err) return res.send(err);
                  return res.json(updatedata);
                })
              })
            }
            else{
              return res.status(500).json('Password is not the same');
            }
            
            
          } 
          else{
            return res.status(500).json('wrong password');
          }
        })
      }
      else{
        return res.status(500).json('Error');
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

// app.post('/profileupdatephonenum/:id',function (req, res, next) {
//   const userid = req.params.id;
//   try{
    
//   }catch(err){
//     console.log(err);
//     return res.status(500).send();
//   }
// })
app.post('/profileupdate/:id',function (req, res, next) {
  const userid = req.params.id;
  try{
    connection.execute("SELECT username FROM users WHERE username=? ",[req.body.username],(err,data) =>  {
          if (err) return res.send(err);
          if(data.length > 0){
            res.status(400).json('Username already exists!');
          }else{
            connection.query("UPDATE users SET username=?,fname=?,lname=?,phonenum=? WHERE id=? ",[req.body.username,req.body.fname,req.body.lname,req.body.phonenum,userid],(err,updatedata) =>  {
                if (err) return res.send(err);
                return res.json(updatedata);
            })
          }
    
        })
    // if(Object.keys(req.body.username).length > 0){
    //   connection.execute("SELECT username FROM users WHERE username=? ",[req.body.username],(err,data) =>  {
    //     if (err) return res.send(err);
    //     if(data.length > 0){
    //       res.status(400).json('Username already exists!');
    //     }else{
    //       connection.query("UPDATE users SET username=? WHERE id=? ",[req.body.username,userid],(err,updatedata) =>  {
    //           if (err) return res.send(err);
    //           return res.json(updatedata);
    //       })
    //     }
  
    //   })
    // }
    // if(Object.keys(req.body.fname).length > 0){
    //   connection.query("UPDATE users SET fname=? WHERE id=? ",[req.body.fname,userid],(err,updatedata) =>  {
    //     if (err) return res.send(err);
    //     return res.json(updatedata);
    //   })
    // }
    // if(Object.keys(req.body.phonenum).length > 0){
    //   connection.query("UPDATE users SET phonenum=? WHERE id=? ",[req.body.phonenum,userid],(err,updatedata) =>  {
    //     if (err) return res.send(err);
    //     return res.json(updatedata);
    //   })
    // }
    // if(Object.keys(req.body.lname).length > 0){
    //   connection.query("UPDATE users SET lname=? WHERE id=? ",[req.body.lname,userid],(err,updatedata) =>  {
    //     if (err) return res.send(err);
    //     return res.json(updatedata);
    //   })
    // }
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
// app.post('/profileupdatefname/:id',function (req, res, next) {
//   const userid = req.params.id;
//   try{
    
//   }catch(err){
//     console.log(err);
//     return res.status(500).send();
//   }
// })  
// app.post('/profileupdatelname/:id',function (req, res, next) {
//   const userid = req.params.id;
//   try{
    
//   }catch(err){
//     console.log(err);
//     return res.status(500).send();
//   }
// })  
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
// const verifyjwt = (req,res,next)=>{
//   const token = req.header["access-token"]
//   if (!token) return res.status(401).json("Not authenticated!");
//   else{
//     jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
//       if (err) return res.status(403).json("Token is not valid!");
//       else{
//         req.userid = userInfo.id;
//         next();
//       }
//     })
//   }
  
// }
app.get('/token',  function (req, res, next) {
  try{
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token,process.env.TOKEN_KEY, (err, usertoken) => {
      if (err) return res.status(403).json("Token is not valid!");
      else{
        res.json(usertoken)
      }
    })
  }catch{
    res.status(500).send('Server token Error')
  }
  
})

app.get('/profileid',  function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
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
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(500).json("Not authenticated!");
  }
  else{
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      if (err) return res.status(500).json("Token is not valid!");
      else{
        const pay_id = 'ยังไม่ชำระเงิน';
        connection.query("SELECT * FROM users WHERE id = ?", [userInfo.id], (err, data) => {
          if (err) return res.status(500).send(err);
          else{
            const date = new Date()
            const result = date.toLocaleString('th-TH')
            connection.execute("INSERT INTO history(fname,lname,idcard,userid,type_id,criminal,bankrupt,credit,penalty,global,other_text,pay,createdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [req.body.fname,req.body.lname,req.body.idcard,data[0].id,req.body.type_id,req.body.criminal,req.body.bankrupt,req.body.credit,req.body.penalty,req.body.global,req.body.other_text,pay_id,result],
              function(err, results, fields) {
                if(err) {
                  res.json({status:'error',message:err})
                  return
                }
                else{
                  return res.json(results);
                }
                  
              }
              
            )
              
           
          }
        })
        
       
      }
    })
  }
  
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
app.post('/registeradmin/:id', function (req, res, next) {
  const userid = req.params.id;
  
  connection.query("SELECT username FROM users WHERE username = ?", [req.body.username], (err, data) => {
    if (err) return res.status(500).json("This username already exists.");
    if (data.length > 0) 
        return res.status(500).json("This username already exists.");
    else{
      console.log('ok');
      connection.query("SELECT email FROM users WHERE email = ?", [req.body.email], (err, data) => {
        if (err) return res.status(500).json("This E-mail already exists.");
        if (data.length > 0) 
          return res.status(500).json("This E-mail already exists.");
        else{
          console.log('ok2');
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            console.log('ok3');
            
            const token = req.headers.authorization.split(' ')[1];
                  if (!token) {
                    return res.status(500).json("Not authenticated!");
                  }
                  else{
                    console.log('ok3');
                    console.log(token)
                    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
                      if (err) return res.status(500).json("Token is not valid!");
                      else{
                        connection.execute("SELECT fname FROM users WHERE id=? ",[userid],(err,data) =>  {
                          if (err) return res.send(err);
                          else{
                            const doing = 'เพิ่มผู้ดูแลระบบ';
                            const date = new Date()
                            const result = date.toLocaleString('th-TH')
                            console.log(data[0].fname)
                            console.log(req.body.fname)
                            connection.execute("INSERT INTO historyadmin(doing,idadmin,date,userid) VALUES (?, ?, ?, ?)",[doing,data[0].fname,result,req.body.fname],function(err, results, fields) {
                              if(err) {
                                res.json({status:'error',message:err})
                                return
                              }else{
                                console.log('ok5');
                                const img = 'user-6820232_640.webp';
                                const status ='';
                                
                                connection.execute(
                                  'INSERT INTO users(email,password,fname,lname,username,phonenum,status,statusadmin,profilepic,createdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                  [req.body.email, hash,req.body.fname,req.body.lname,req.body.username,req.body.phonenum,status,req.body.statusadmin,img,result],
                                  function(err, results, fields) {
                                    if (err) return res.status(500).json(err);
                                    return res.status(200).json("User has been created.");
                        
                        
                                  }
                                );
                              }
                            })

                          }
                        })
                        
                      }
                    })
                  }
            
          
          });
        }
        
      })
    }
    
    
  });
  
  
})
app.post('/registeradminuser/:id', function (req, res, next) {
  const userid = req.params.id;
  
  connection.query("SELECT username FROM users WHERE username = ?", [req.body.username], (err, data) => {
    if (err) return res.status(500).json("This username already exists.");
    if (data.length > 0) 
        return res.status(500).json("This username already exists.");
    else{
      console.log('ok');
      connection.query("SELECT email FROM users WHERE email = ?", [req.body.email], (err, data) => {
        if (err) return res.status(500).json("This E-mail already exists.");
        if (data.length > 0) 
          return res.status(500).json("This E-mail already exists.");
        else{
          console.log('ok2');
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            console.log('ok3');
            
            const token = req.headers.authorization.split(' ')[1];
                  if (!token) {
                    return res.status(500).json("Not authenticated!");
                  }
                  else{
                    console.log('ok3');
                    console.log(token)
                    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
                      if (err) return res.status(500).json("Token is not valid!");
                      else{
                        connection.execute("SELECT fname FROM users WHERE id=? ",[userid],(err,data) =>  {
                          if (err) return res.send(err);
                          else{
                            const doing = 'เพิ่มผู้ใช้';
                            const date = new Date()
                            const result = date.toLocaleString('th-TH')
                            console.log(data[0].fname)
                            console.log(req.body.fname)
                            connection.execute("INSERT INTO historyadmin(doing,idadmin,date,userid) VALUES (?, ?, ?, ?)",[doing,data[0].fname,result,req.body.fname],function(err, results, fields) {
                              if(err) {
                                res.json({status:'error',message:err})
                                return
                              }else{
                                console.log('ok5');
                                const img = 'user-6820232_640.webp';
                                const status ='1';
                                const statusadmin ='';
                                connection.execute(
                                  'INSERT INTO users(email,password,fname,lname,username,phonenum,status,statusadmin,profilepic,createdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                  [req.body.email, hash,req.body.fname,req.body.lname,req.body.username,req.body.phonenum,status,statusadmin,img,result],
                                  function(err, results, fields) {
                                    if (err) return res.status(500).json(err);
                                    return res.status(200).json("User has been created.");
                        
                        
                                  }
                                );
                              }
                            })

                          }
                        })
                        
                      }
                    })
                  }
            
          
          });
        }
        
      })
    }
    
    
  });
  
  
})
app.get('/adminuser',function (req,res,next){
  try{
    connection.execute("SELECT username,lname,fname,email,phonenum,profilepic,id,status  FROM users",(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})

app.get('/admindelete/:id',function (req, res, next){
  const userid = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(500).json("Not authenticated!");
  }
  else{
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      if (err) return res.status(500).json("Token is not valid!");
      else{
        const doing = 'ระงับผู้ใช้';
        const date = new Date();
        const result = date.toLocaleString('th-TH')
        connection.execute("SELECT fname FROM users WHERE id=? ",[userInfo.id],(err,data) =>  {
          if (err) return res.send(err);
          else{
            connection.execute("SELECT fname FROM users WHERE id=? ",[userid],(err,datauser) =>  {
              if (err) return res.send(err);
              else{
                connection.execute("INSERT INTO historyadmin(doing,idadmin,date,userid) VALUES (?, ?, ?, ?)",[doing,data[0].fname,result,datauser[0].fname],function(err, results, fields) {
                  if(err) {
                    return res.json({status:'error',message:err})
                  }else{
                    connection.query("DELETE FROM users WHERE `id`=? ",[userid],(err,deletedata) =>  {
                      if (err) return res.send(err);
                      else{
                        return res.json(deletedata);
                      }
                    })
                  }
                })
              }
            })
          }
        })

      }    
    })
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
const adminhis =()=>{
  const token = req.body.token;
  if (!token) {
    return res.status(500).json("Not authenticated!");
  }
  else{
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      if (err) return res.status(500).json("Token is not valid!");
      else{
        connection.execute("INSERT INTO historyadmin(doing,username,date,userid) VALUES (?, ?, ?, ?)",[req.body.doing,req.body.username,req.body.date,userid],function(err, results, fields) {
          if(err) {
            res.json({status:'error',message:err})
            return
          }else{
            connection.execute("INSERT INTO historydetails(id,birthday,father,mother,religion,criminal,bankrupt,credit,penalty,global,other) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [userid,req.body.birthday,req.body.father,req.body.mother,req.body.religion,req.body.criminal,req.body.bankrupt,req.body.credit,req.body.penalty,req.body.global,req.body.other],
            function(err, results, fields) {
              if(err) {
                res.json({status:'error',message:err})
                return
              }else{
                return res.json(results);
          
                }
            })
          }
        })
      }    
    })
  }
}
app.post('/adminhistory/:id',function (req, res, next) {
  const userid = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  
  console.log(token)
  if (!token) {
    return res.status(500).json("Not authenticated!");
  }
  else{
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      if (err) return res.status(500).json("Token is not valid!");
      else{
        console.log("ok1")
        const doing = 'เพิ่มประวัติผู้ใช้';
        const date = new Date();
        const result = date.toLocaleString('th-TH')
        console.log(date);
        console.log(userInfo.id)
        connection.execute("SELECT fname FROM users WHERE id=? ",[userInfo.id],(err,datauser) =>  {
          if (err) return res.send(err);
          else{
            
            connection.execute("SELECT fname FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
              if (err) return res.send(err);
              else{
                
                
                    console.log(req.body.address)
                    connection.execute("INSERT INTO historydetails(id,birthday,father,mother,address,criminal,bankrupt,credit,penalty,global,other) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [userid,req.body.birthday,req.body.father,req.body.mother,req.body.address,req.body.criminal,req.body.bankrupt,req.body.credit,req.body.penalty,req.body.global,req.body.other],
                    function(err, results, fields) {
                      if(err) {
                        res.json({status:'error',message:err})
                        return
                      }else{
                        console.log("ok5")
                        connection.execute("INSERT INTO historyadmin(doing,idadmin,date,userid) VALUES (?, ?, ?, ?)",[doing,datauser[0].fname,result,data[0].fname],function(err, results, fields) {
                          if(err) {
                            res.json({status:'error',message:err})
                            return
                          }else{
                            return res.json(results);
                          }
                        })
                  
                      }
                    })
                 
              }
            })
          }
        })
        
      }    
    })
  }
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
    connection.execute("SELECT * FROM historydetails WHERE id=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/history/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT lname,fname,type_id,idcard,pay  FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/historypay/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT *  FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
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
      
      else{
        console.log(data)
        connection.query("SELECT * FROM users WHERE id = ?", [data[0].userid], (err,paydata) => {
          if (err) return res.send(err);
          return res.json(paydata);
        })
      }
      
      
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})

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
app.post('/paystatus/:id',function (req, res, next){
  const userid = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(500).json("Not authenticated!");
  }
  else{
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      if (err) return res.status(500).json("Token is not valid!");
      else{
        const doing = 'เปลี่ยนสถานะการตรวจสอบประวัติ';
        const date = new Date();
        connection.execute("INSERT INTO historyadmin(doing,idadmin,date,userid) VALUES (?, ?, ?, ?)",[doing,userInfo.id,date,userid],function(err, results, fields) {
          if(err) {
            res.json({status:'error',message:err})
            return
          }else{
            if(req.body.pay == "พบข้อผิดพลาดในการชำระเงิน"){
              connection.query("DELETE FROM imgpay WHERE `idhistory`=? ",[userid],(err,deletedata) =>  {
                if (err) return res.send(err);
                else{
                  connection.query("UPDATE history SET pay= ? WHERE idhistory=? ",[req.body.pay,userid],(err,updatedata) =>  {
                    if (err) return res.send(err);
                    return res.json(updatedata);
                  })
                }
              })
            }else{
              connection.query("UPDATE history SET pay= ? WHERE idhistory=? ",[req.body.pay,userid],(err,updatedata) =>  {
                if (err) return res.send(err);
                return res.json(updatedata);
              })
            }
            
          }
        })
      }    
    })
  }
})

const storageimg = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});
const uploadsimg =multer({
  storage: storageimg
})
app.post('/imgpay/:id',uploads.array('file'),function (req, res, next){
   // Logs form body values
  console.log(req.files.length);
  const num = req.files.length;
  try {
      // code
      const userid = req.params.id
      console.log(req.body.input)
    
      // for(let i =0; i < num; i++) {
        //console.log(req.files[i])
        connection.execute("INSERT INTO imgpay(picpay,idhistory) VALUES (?, ?)",[req.files[0].filename,userid],function(err, results, fields) {
          if(err) {
            res.json({status:'error',message:err})
            return
          }else{
            if(num == 1){
              return res.json({status:'ok'});
            }
            else{
              connection.execute("INSERT INTO imgpay(picpay,idhistory) VALUES (?, ?)",[req.files[1].filename,userid],function(err, results, fields) {
                if(err) {
                  res.json({status:'error',message:err})
                  return
                }else{
                  
                  return res.json({status:'ok'});
                }
              })
            }
            
            
            
         }
        })
      // }
      
      // connection.query("UPDATE history SET picpay= ? WHERE idhistory=? ",[req.file.filename,userid],(err,updatedata) =>  {
      //   if (err) return res.send(err);
      //   return res.json(updatedata);
      // })
      // const updated = await Product
      //     .findOneAndUpdate({ _id: id }, newData, { new: true })
      //     .exec()

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})


app.post('/amount/:id',function (req, res, next){
  
  try {
      // code
      const userid = req.params.id
      console.log(req.body.date)
      const date =new Date()
      const result = date.toLocaleString('en-GB', { timeZone: 'UTC' })
      //console.log( )
      // connection.execute("SELECT * FROM imgpay WHERE idhistory=? ",[userid],(err,data) =>  {
      //   if (err) return res.send(err);
      //   return res.json(data);
      // })
      connection.query("UPDATE imgpay SET amount= ?,datecreate=? WHERE idhistory=? ",[req.body.amount,req.body.date,userid],(err,updatedata) =>  {
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
app.get('/imagepay/:id',imgpay.single('file'),function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT picpay FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/otp',function (req, res, next){
  const token = req.headers.authorization.split(' ')[1];  
  if (!token) return res.status(401).json("Not authenticated!");
  else{
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      else{
        console.log(userInfo)
        connection.execute("SELECT * FROM users WHERE email=? ",[userInfo.id],(err,data) =>  {
          if (err) return res.send(err);   
          else{
            console.log('ok')
            const status = data[0].status;
            const otp = otpGenerator.generate(6, {
              upperCaseAlphabets: true,
              specialChars: false,
            });
            console.log(otp)
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: 'seen6083@gmail.com', // your email
                pass: 'zeyxuvkqffsvanhh' // your email password
              }
            });
            let mailOptions = {
              from: 'seen6083@gmail.com',                
              to: data[0].email,                
              subject: "OTP form Callback Coding",
              text: `Your OTP is: ${otp}`,  
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log(info);
                console.log("Email sent successfully!");
                bcrypt.hash(otp, saltRounds, function(err, hasheotp) {
                  if(err){
                    return res.status(403).json("error");
                  }else{
                    console.log(hasheotp)
                    connection.query("UPDATE users SET OTP= ? WHERE email=? ",[hasheotp,userInfo.id],(err,updatedata) =>  {
                      if (err) return res.send(err);
                      return res.json({message:'otp success',status})
                    })
                  }
                  
                });
              }
            });
            
          }
        })
        
        
        
        
        // connection.query("SELECT phonenum FROM users WHERE id = ?", [userInfo.id], (err, data) => {
        //   if (err) return res.send(err);
        //   else{
            
        //   }
        // })
      
      }
    })

  }
})
app.get('/otplogin',function (req, res, next){
  const token = req.headers.authorization.split(' ')[1];  
  if (!token) return res.status(401).json("Not authenticated!");
  else{
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      else{
        console.log(userInfo)
        connection.execute("SELECT * FROM users WHERE email=? ",[userInfo.id],(err,data) =>  {
          if (err) return res.send(err);   
          else{
            console.log('ok')
            const status = data[0].status;
            const otp = otpGenerator.generate(6, {
              upperCaseAlphabets: true,
              specialChars: false,
            });
            console.log(otp)
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: 'seen6083@gmail.com', // your email
                pass: 'zeyxuvkqffsvanhh' // your email password
              }
            });
            let mailOptions = {
              from: 'seen6083@gmail.com',                
              to: 'thawanrat.so@ku.th',                
              subject: "OTP form Callback Coding",
              text: `Your OTP is: ${otp}`,  
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log(info);
                console.log("Email sent successfully!");
                bcrypt.hash(otp, saltRounds, function(err, hasheotp) {
                  if(err){
                    return res.status(403).json("error");
                  }else{
                    console.log(hasheotp)
                    connection.query("UPDATE users SET OTP= ? WHERE email=? ",[hasheotp,userInfo.id],(err,updatedata) =>  {
                      if (err) return res.send(err);
                      return res.json({message:'otp success',status})
                    })
                  }
                  
                });
              }
            });
            
          }
        })
        
        
        
        
        // connection.query("SELECT phonenum FROM users WHERE id = ?", [userInfo.id], (err, data) => {
        //   if (err) return res.send(err);
        //   else{
            
        //   }
        // })
      
      }
    })

  }
})
app.post('/otpvverification',function (req, res, next){
  const token = req.headers.authorization.split(' ')[1];  
  if (!token) return res.status(401).json("Not authenticated!");
  else{
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      else{
        console.log(userInfo)
          connection.execute("SELECT * FROM users WHERE email=? ",[userInfo.id],(err,data) =>  {
            if (err) return res.send(err);   
            else{
              const status = data[0].status
              console.log(data[0].OTP)
              console.log(req.body.OTP)
              bcrypt.compare(req.body.OTP, data[0].OTP, function(err, otp) { 
                if(err){
                  console.log(req.body.OTP)
                  return res.status(500).json('error');
                }
                if(otp) {
                  const token = jwt.sign({ id :data[0].id},process.env.TOKEN_KEY,{expiresIn:"2h"});
                  return res.json({message:'otp verification',status,token})
                }else{
                  return res.status(500).json('otp error');
                }
        
              });
            }
          })
        }
      }) 
  } 
})
app.post('/sendemail',function (req, res, next){
  try {
    connection.execute("SELECT * FROM users WHERE email=? ",[req.body.email],(err,data) =>  {
        if (err) return res.send(err);
        if(data){
          const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: true,
            specialChars: false,
          });
          console.log(otp)
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: 'seen6083@gmail.com', // your email
              pass: 'zeyxuvkqffsvanhh' // your email password
            }
          });
          let mailOptions = {
            from: 'seen6083@gmail.com',                
            to: data[0].email,                
            subject: "OTP form Reset password",
            text: `Your OTP is: ${otp}`,  
          };
          
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log(info);
              console.log("Email sent successfully!");
              bcrypt.hash(otp, saltRounds, function(err, hasheotp) {
                if(err){
                  return res.status(403).json("error");
                }else{
                  console.log(hasheotp)
                  connection.query("UPDATE users SET OTP= ? WHERE id=? ",[hasheotp,data[0].id],(err,updatedata) =>  {
                    if (err) return res.send(err);
                    else{
                      const token = jwt.sign({ id :data[0].email},process.env.TOKEN_KEY,{expiresIn:"2h"});
                      return res.json({message:'otp send',token})
                    }
                    
                  })
                }
                
              });
            }
          });
        }
        else{
          return res.status(500).json('otp error');
        }
      })
  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.post('/forgotpassword',function (req, res, next) {
  const {newpassword,conpassword} =req.body;
  const token = req.headers.authorization.split(' ')[1];  
  if (!token) return res.status(401).json("Not authenticated!");
  else{
    console.log(token)
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      connection.query("SELECT password FROM users WHERE email=? ",[userInfo.id],(err,data) =>  {
        if(data){ 
              if(conpassword==newpassword){
                bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                  if(err){
                    return res.status(500).json('update error');
                  }
                  connection.query("UPDATE users SET password= ? WHERE email=? ",[hash,userInfo.id],(err,updatedata) =>  {
                    if (err) return res.send(err);
                    return res.json(updatedata);
                  })
                })
              }
              else{
                return res.status(500).json('Password is not the same');
              }
        }
        else{
          return res.status(500).json('Error');
        }
      })
    })
  }
});
app.post('/historyadmin',function (req, res, next){
  try {
      
      connection.query("SELECT * FROM historyadmin" ,(err,data) =>  {
        if (err) return res.send(err);
        return res.json(data);
      })

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.post('/selectuser',function (req, res, next){
  try {
    const status ="1";
      connection.query("SELECT * FROM users WHERE status = ? " ,[status],(err,data) =>  {
        if (err) return res.send(err);
        return res.json(data);
      })

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.post('/selectadmin',function (req, res, next){
  try {
    const status ="1";
      connection.query("SELECT * FROM users WHERE status != ? " ,[status],(err,data) =>  {
        if (err) return res.send(err);
        return res.json(data);
      })

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.post('/updatelevel/:id',function (req, res, next){
  const userid = req.params.id;
  const token = req.headers.authorization.split(' ')[1];  
  if (!token) return res.status(401).json("Not authenticated!");
  else{
      console.log(token)
      jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
        if (err) return res.status(500).json("Token is not valid!");
        else{
          connection.execute("SELECT fname FROM users WHERE id=? ",[userInfo.id],(err,data) =>  {
            if (err) return res.send(err);
            else{
              connection.execute("SELECT * FROM users WHERE id=? ",[userid],(err,datauser) =>  {
                if (err) return res.send(err);
                else{
                  const doing = 'เปลี่ยนระดับผู้ดูแลระบบ จากระดับ '+datauser[0].statusadmin+' เป็น ระดับ '+req.body.statusadmin;
                  console.log(doing)
                  const date = new Date()
                  const result = date.toLocaleString('th-TH')
                  console.log(data[0].fname)
                  console.log(datauser[0].fname)
                  connection.execute("INSERT INTO historyadmin(doing,idadmin,date,userid) VALUES (?, ?, ?, ?)",[doing,data[0].fname,result,datauser[0].fname],function(err, results, fields) {
                    if(err) {
                      res.json({status:'error',message:err})
                      return
                    }else{
                      console.log('ok5');
                      connection.query("UPDATE users SET statusadmin= ? WHERE id=? ",[req.body.statusadmin,userid],(err,updatedata) =>  {
                        if (err) return res.send(err);
                        else{
                          return res.json(updatedata);
                        }
                      })
                    }
                  })
                }
              })
              

            }
          })
          
        }
      }) 
  } 
})
app.get('/adminuserprofile',function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];  
  if (!token) return res.status(401).json("Not authenticated!");
  else{
    console.log(token)
    jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
      connection.query("SELECT * FROM users WHERE id=? ",[userInfo.id],(err,data) =>  {
        if(data){ 
          return res.json(data);
        }
        else{
          return res.status(500).json('Error');
        }
      })
    })
  }
});
app.get('/selecthistory',function (req, res, next) {
  connection.query("SELECT * FROM history  ",(err,data) =>  {
    if(data){ 
      return res.json(data);
    }
    else{
      return res.status(500).json('Error');
    }
  })

});
app.get('/numadmin',function (req, res, next) {
  const status ='1';
  connection.query("SELECT COUNT(id) as numadmin FROM users WHERE statusadmin > 0 ",(err,data) =>  {
    if(err) {
      res.json({status:'error',message:err})
      return
    }else{
      return res.json(data);
    }
  })

});
app.get('/numuserid',function (req, res, next) {
  const status ='1';
  connection.query("SELECT COUNT(id) as numuser FROM users WHERE status = ? ",[status],(err,data) =>  {
    if(err) {
      res.json({status:'error',message:err})
      return
    }else{
      return res.json(data);
    }
  })

});
app.get('/numhistory',function (req, res, next) {
  connection.query("SELECT COUNT(idhistory) as numhistory FROM history ",(err,data) =>  {
    if(err) {
      res.json({status:'error',message:err})
      return
    }else{
      return res.json(data);
    }
  })

});
app.get('/numsuccess',function (req, res, next) {
  const pay ='เสร็จสิ้น';
  connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[pay],(err,data) =>  {
    if(err) {
      res.json({status:'error',message:err})
      return
    }else{
      return res.json(data);
    }
  })

});
app.get('/numnopay',function (req, res, next) {
  const pay ='ยังไม่ชำระเงิน';
  connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[pay],(err,data) =>  {
    if(err) {
      res.json({status:'error',message:err})
      return
    }else{
      return res.json(data);
    }
  })

});
app.get('/numpay',function (req, res, next) {
  const pay ='ชำระเงินเสร็จสิ้น';
  connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[pay],(err,data) =>  {
    if(err) {
      res.json({status:'error',message:err})
      return
    }else{
      return res.json(data);
    }
  })

});
app.get('/numpaying',function (req, res, next) {
  const pay ='กำลังตรวจสอบการชำระเงิน';
  connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[pay],(err,data) =>  {
    if(err) {
      res.json({status:'error',message:err})
      return
    }else{
      return res.json(data);
    }
  })

});
app.get('/numhistorying',function (req, res, next) {
  const pay ='กำลังตรวจสอบ';
  connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[pay],(err,data) =>  {
    if(err) {
      res.json({status:'error',message:err})
      return
    }else{
      return res.json(data);
    }
  })

});
app.post('/adminupdatestatus/:id',function (req, res, next){
  try {
      const userid = req.params.id;
      connection.query("SELECT * FROM users WHERE id=?" ,[userid],(err,data) =>  {
        if (err) return res.send(err);
        return res.json(data);
      })

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.get('/piechart',function (req, res, next){
  try {
    const paying ='กำลังตรวจสอบการชำระเงิน';
    connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[paying],(err,data) =>  {
      if(err) {
        res.json({status:'error',message:err})
        return
      }else{
        console.log(data[0].num)
        const numpaying= data[0].num;
        const history ='เสร็จสิ้น';
        connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[history],(err,data) =>  {
          if(err) {
            res.json({status:'error',message:err})
            return
          }else{
            console.log(data[0].num)
            const numhistory= data[0].num;
            const errpay = "พบข้อผิดพลาดในการชำระเงิน";
            connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[errpay],(err,data) =>  {
              if(err) {
                res.json({status:'error',message:err})
                return
              }else{
                console.log(data[0].num)
                const numerrpay= data[0].num;
                const historying ='กำลังตรวจสอบ';
                connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[historying],(err,data) =>  {
                  if(err) {
                    res.json({status:'error',message:err})
                    return
                  }else{
                    console.log(data[0].num)
                    const numhistorying = data[0].num;
                    const pay ='ชำระเงินเสร็จสิ้น';
                    connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[pay],(err,data) =>  {
                      if(err) {
                        res.json({status:'error',message:err})
                        return
                      }else{
                        console.log(data[0].num)
                        const numpay = data[0].num;
                        const nopay ='ยังไม่ชำระเงิน';
                        connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[nopay],(err,data) =>  {
                          if(err) {
                            res.json({status:'error',message:err})
                            return
                          }else{
                            console.log(data[0].num)
                            const numnopay = data[0].num;
                            return res.json({message:'num ok',numerrpay,numhistory,numhistorying,numpay,numpaying,numnopay})
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.get('/amountpaid/:id',function (req, res, next){
  try {
    const userid = req.params.id;
    let paid = 0;
    const hundred = 100;
 
    const paying ='กำลังตรวจสอบการชำระเงิน';
    connection.query("SELECT * FROM history WHERE idhistory = ?",[userid],(err,data) =>  {
      if(err) {
        res.json({status:'error',message:err})
        return
      }else{
        if(data[0].criminal =='1'){
          paid = paid+hundred  ;
        }
        if(data[0].bankrupt =='1'){
          paid = paid+hundred  ;
        }
        if(data[0].credit =='1'){
          paid = paid+hundred  ;
        }
        if(data[0].penalty =='1'){
          paid = paid+hundred  ;
        }
        if(data[0].global =='1'){
          paid = paid+hundred  ;
        }
        if(data[0].other_text !=''){
          paid = paid+hundred  ;
        }
        console.log(paid)
        connection.query("UPDATE history SET amountpaid = ? WHERE idhistory=?",[paid,userid],(err,data) =>  {
          if(err) {
            res.json({status:'error',message:err})
            return
          }else{
            return res.json(data)
          }
        })
        // const numpaying= data[0].num;
        // const history ='เสร็จสิ้น';
        // connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[history],(err,data) =>  {
        //   if(err) {
        //     res.json({status:'error',message:err})
        //     return
        //   }else{
        //     console.log(data[0].num)
        //     const numhistory= data[0].num;
        //     const errpay = "พบข้อผิดพลาดในการชำระเงิน";
        //     connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[errpay],(err,data) =>  {
        //       if(err) {
        //         res.json({status:'error',message:err})
        //         return
        //       }else{
        //         console.log(data[0].num)
        //         const numerrpay= data[0].num;
        //         const historying ='กำลังตรวจสอบ';
        //         connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[historying],(err,data) =>  {
        //           if(err) {
        //             res.json({status:'error',message:err})
        //             return
        //           }else{
        //             console.log(data[0].num)
        //             const numhistorying = data[0].num;
        //             const pay ='ชำระเงินเสร็จสิ้น';
        //             connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[pay],(err,data) =>  {
        //               if(err) {
        //                 res.json({status:'error',message:err})
        //                 return
        //               }else{
        //                 console.log(data[0].num)
        //                 const numpay = data[0].num;
        //                 const nopay ='ยังไม่ชำระเงิน';
        //                 connection.query("SELECT COUNT(idhistory) as num FROM history WHERE pay = ?",[nopay],(err,data) =>  {
        //                   if(err) {
        //                     res.json({status:'error',message:err})
        //                     return
        //                   }else{
        //                     console.log(data[0].num)
        //                     const numnopay = data[0].num;
        //                     return res.json({message:'num ok',numerrpay,numhistory,numhistorying,numpay,numpaying,numnopay})
        //                   }
        //                 })
        //               }
        //             })
        //           }
        //         })
        //       }
        //     })
        //   }
        // })
      }
    })

  } catch (err) {
      // error
      console.log(err)
      res.status(500).send('Server Error')
  }
})
app.get('/gethistory/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT * FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/usergethistory/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT * FROM history WHERE userid=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/profileotp',  function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token,process.env.TOKEN_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    else{
      connection.query("SELECT id FROM users WHERE email = ?", [userInfo.id], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      })
     
    }
  })
})
app.get('/deleteotp/:id',function (req, res, next) {
  const userid = req.params.id;

  const deleteotp = '';
  try{
    connection.query("UPDATE users SET OTP= ? WHERE id=? ",[deleteotp,userid],(err,updatedata) =>  {
      if (err) return res.send(err);
      return res.json(updatedata);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/updatehi/:id',function (req, res, next) {
  const userid = req.params.id;
  const doing = 'เพื่ิมผู้ใช้'
  const date = new Date()
  const result = date.toLocaleString('th-TH')
  try{
    connection.query("SELECT * FROM users WHERE id = ? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      else{
        connection.execute("INSERT INTO historyadmin(doing,idadmin,date,userid) VALUES (?, ?, ?, ?)",[doing,data[0].fname,result,req.body.fname],function(err, results, fields) {
          if(err) {
            res.json({status:'error',message:err})
            return
          }else{
            res.json({status:'ok'})
            return
          }
        })
      }
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/getpiccheckpay/:id',function (req, res, next) {
  const userid = req.params.id;
  
  try{
    connection.execute("SELECT * FROM imgpay WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      return res.json(data);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/updatecheckpay/:id',function (req, res, next) {
  const userid = req.params.id;
  const pay = 'กำลังตรวจสอบ';
  try{
    connection.query("UPDATE history SET pay= ? WHERE idhistory=? ",[pay,userid],(err,updatedata) =>  {
      if (err) return res.send(err);
      else{
        return res.json(updatedata);
      }
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/updatecheckhidtory/:id',function (req, res, next) {
  const userid = req.params.id;
  const pay = 'เสร็จสิ้น';
  try{
    connection.query("UPDATE history SET pay= ? WHERE idhistory=? ",[pay,userid],(err,updatedata) =>  {
      if (err) return res.send(err);
      else{
        return res.json(updatedata);
      }
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
const storages = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
const uploadss =multer({
  storage: storage
})
app.post('/filehistory/:id',uploadss.single('file'),function (req, res, next){
  console.log(req.file)
  try {
      // code
      const userid = req.params.id
      if(req.file == undefined){
        const file = ''
        connection.query("UPDATE historydetails SET filehistory= ? WHERE id=? ",[file,userid],(err,updatedata) =>  {
          if (err) return res.send(err);
          else{
            console.log('ok')
            return 
          }
          
        })
      }else{
        connection.query("UPDATE historydetails SET filehistory= ? WHERE id=? ",[req.file.filename,userid],(err,updatedata) =>  {
          if (err) return res.send(err);
          else{
            console.log('ok')
            return res.json(updatedata);
          }
          
        })
      }
      connection.query("UPDATE historydetails SET filehistory= ? WHERE id=? ",[req.file.filename,userid],(err,updatedata) =>  {
        if (err) return res.send(err);
        else{
          console.log('ok')
          return res.json(updatedata);
        }
        
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
app.post('/getcheckpayqr/:id',function (req, res, next) {
  const userid = req.params.id;
  console.log(req.body.userid)
  
  try{
    connection.query("UPDATE history SET pay= ? WHERE idhistory=? ",[req.body.qrcheck,req.body.userid],(err,updatedata) =>  {
        if (err) return res.send(err);
        else{
          console.log('ok')
          return res.json(updatedata);
        }
        
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/checkidcard/:id',function (req, res, next) {
  const userid = req.params.id;
  const check = [];
 
  try{
    connection.execute("SELECT * FROM history WHERE userid=? ",[userid],(err,user) =>  {
      const numuser = user.length
      const endfor = numuser-1
      console.log(user[6])
      console.log(endfor)
        for(let i = 0; i < numuser; i++) {
          console.log('numi',i)
          if(i == endfor){
            console.log('endfor')
            const numcheck = check.length
            if(check[numcheck-1].idcard != user[i].idcard){
              console.log("สุดท้าย")
              check[numcheck] = user[i]
              console.log('0',i)
            } 
          }else{
            for(let j = i+1; j < numuser; j++) {
              
                if(user[i].idcard == user[j].idcard){
                  if(check[0] == undefined){
                    check[0] = user[i]
                    console.log('1',i)
                    
                  }else{
                    for(let k =0; k < check.length; k++) {
                      if(check[k].idcard == user[i].idcard){
                        console.log('2',i)
                        
                      }else{
                        if(check[k+1] == undefined){
                          check[k+1] = user[i]
                          console.log('4',i)
                          
                        }
                        
                      }
                      k+1;
                    }
                  }
                }else{
                  if(check[0]==undefined){
                    check[0] = user[i]
                    console('5',i)
                  }else{
                    for(let f=0; f < check.length; f++) {
                      
                      if(check[f].idcard == user[i].idcard){
                        console.log('3',i)
                        
                      }else{
                        if(check[f+1]==undefined){
                          check[f+1] = user[i]
                          console.log('4',i)
                          
                        }
                        
                      }
                      f+1;
                    }
                  }
                  
                
              }
              j+1;
            } 
          }
          i+1;  
        }  
        console.log(check.length)
        return res.json(check);
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
app.get('/gethistoryidcard/:id',function (req, res, next) {
  const userid = req.params.id;
  let historyuser = [];
  try{
    connection.execute("SELECT * FROM history WHERE idhistory=? ",[userid],(err,data) =>  {
      if (err) return res.send(err);
      else{
        
        connection.execute("SELECT * FROM history WHERE idcard=? and userid = ? ",[data[0].idcard,data[0].userid],(err,history) =>  {
          if (err) return res.send(err);
          else{
            if(history.length == 1){
              return res.json(history);
            }else{
              
              const num = historyuser.length
              console.log(history.idhistory)
              for(let i = 0; i < history.length; i++) {
                connection.query("SELECT * FROM historydetails WHERE id=?",[history.idhistory],(err,user) =>  {
                    if (err) return res.send(err);
                    
                    historyuser[num] = user[0];
                    console.log(num)
                    console.log(historyuser)
                    return res.json(historyuser);
                  })
                i+1;
              }
              
            }
            
          }
        })
      }
      
    })
  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})
// app.listen(process.env.PROST || 3000)
app.listen(3333,()=>{
  console.log("server start")
})
