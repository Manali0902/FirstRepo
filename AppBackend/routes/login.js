const schema = require('../models/studentModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

router.post('/credentials',async(req,res)=>{
    var useremail = req.body.UserEmail;
    var password = req.body.Password;
    console.log(useremail);

    const user = await schema.findOne({UserEmail:useremail});

    if(!user){
        console.log("User Not Found");
        return res.send("User Not Found");
    }
    else
    if(await bcrypt.compare(password,user.Password)){

        const token = jwt.sign({_id:user._id,useremail:user.UserEmail},JWT_SECRET)
        
        TokenDict = {"Token":token}

        console.log(token);
        return res.send(TokenDict);
    }
    else{
        
        console.log("Invalid")
        return res.send("Invalid Email or password");
    }
});

module.exports = router;