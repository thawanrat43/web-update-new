const db  =require("../db.js")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const logout = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
};
module.exports=logout;