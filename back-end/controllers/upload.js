// const fs =require('fs');

// const db = require('../models');
// const Image =db.Image;
// const uploadFile = async (req,res) => {
//     try {
//         console.log(req.file);
        
//         if (req.file == undefined ){
//             return res.send("You must select a flie.");
//         }

//         Image.create({
//             type : req.file.mimetype,
//             name : req.file.originalname,
//             data : fs,readFileSync(
//                 __basedir + "/re "
//             )
//         })
//     }catch(error){
//         console.log(error);
//         return res.send(`Error when trying upload images: ${error}`);
//     }
// };
// module.exports ={
//     uploadFile
// }