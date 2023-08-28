const db  = require('../db.js')
var bcrypt = require('bcrypt')
function register  (req, res)  {
    //CHECK USER IF EXISTS
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
      //CREATE A NEW USER
      //Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
      const q ="INSERT INTO users ('email','password','fname','lname','username','phonenum') VALUE (?)";
  
      const values = [
        req.body.username,
        req.body.email,
        hashedPassword,
        req.body.phonenum,
        req.body.fname,
        req.body.lname

      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
};
module.exports=register;