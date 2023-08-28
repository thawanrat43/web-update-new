const multer = require('multer');

const imageFilter = (req,file ,cb ) => {
    if(file.mimetype.staraWith("image")){
        cb(null,true);
    }else{
        cb("Please upload only images",false);
    }
}
let storge =multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,__basedir + "/re")
    },
    filename:(req,file,cb) => {
        cb(null,`${Date.now()}-image${file.originalname}`)
    }
})

let uploadFile = multer({ storage : storge, fileFilter : imageFilter});

module.exports =uploadFile;