var multer = require('multer');
var imgModel = require('../models/imageModel');
var fs = require('fs');

var express = require('express');
const { randomInt } = require('crypto');
var router = express.Router();
var randomNumber = randomInt(10000);
 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, randomNumber + file.originalname);
    }
});
 
var upload = multer({ storage: storage , limits:{
    fileSize:1024*1024*5
}});
router.post('/image', upload.single('imagename'), (req, res, next) => {
 
    var imageFile = randomNumber+ req.file.originalname;
    console.log(imageFile);
    var imgDetails = new imgModel({
        imagename: imageFile
    })
    imgDetails.save(function(err,doc){
        if(err) throw err;
        res.send("Image Uploaded");
    })
    imgModel.create(imgDetails, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            // res.redirect('/');
        }
    });
});
module.exports = router;