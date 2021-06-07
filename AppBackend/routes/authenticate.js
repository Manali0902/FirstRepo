const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = "feGJWqnd293@#%I(Odjwfj^#@))dwjSFGUEw563752bvJOWgzVvje#@(JCwso0w30FWi4sh243n*Yu#F2OF32"

router.post('/authenticateuser',(req,res)=>{
    const token = req.body.token;
    console.log(token);
    const user = jwt.verify(token,JWT_SECRET);
    console.log("JWT decoded: "+ user.useremail);
    res.send("user is authenticated");
})

module.exports = router;