const schema = require('../models/studentModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

router.post('/forgotpassword',async(req,res)=>{
    var useremail = req.body.UserEmail;
    console.log(useremail);

    const user = await schema.findOne({UserEmail:useremail});

    if(!user){
        console.log("User Not Found");
        return res.send("User Not Found");
    }
    else
    {

        const token = jwt.sign({_id:user._id},JWT_SECRET)
        
        TokenDict = {"Token":token}

        console.log(token);
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
        to: user.UserEmail, // Change to your recipient
        from: 'manaligandhi@linkites.com', // Change to your verified sender
        subject: 'Password Reset Request',
        text: `and easy to do anywhere, even with Node.js ${token}`,
        html: `Click on the link below to reset password <br></br> <br></br> 
        <a href="http://localhost:3001/resetpassword?${token}">http://localhost:3001/resetpassword/${token}</a> </strong>`,
        }

        sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            res.send("Mail has been sent, check your inbox");
        })
        .catch((error) => {
            console.error(error)
            res.send(error);
        })
        
    }
    
});

module.exports = router;