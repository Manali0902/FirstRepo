const schema  = require('../models/studentModel');
var express = require('express');
var router = express.Router();
require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET

router.post('/resetpassword',async (req,res)=>{
    const token = req.body.token;
    const user = await jwt.verify(token,JWT_SECRET);
    console.log(user._id);
    const plainPass = req.body.password;
    const encryptPass = await bcrypt.hash(plainPass,10);
    schema.findByIdAndUpdate({_id:user._id},{"Password":encryptPass}).then(()=>{
        res.send("Updated Successfully")
      }).catch((err)=>{
          res.send("Not Updated")
      })
});

module.exports = router;