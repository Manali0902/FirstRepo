const bcrypt = require('bcrypt');
const schema = require('../models/studentModel');
const express = require('express');
const router = express.Router();

router.post('/createnewstudent',async(req,res)=>{

    const useremail = req.body.UserEmail;
    const username = req.body.UserName;
    const plainTextPassword = req.body.Password;
    const birthday = req.body.Birthday;
    const mobile = req.body.MobileNo;
    const password = await bcrypt.hash(plainTextPassword,10);

    try{
    const result =await schema.create({
        "UserEmail":useremail,
        "UserName":username,
        "Password":password,
        "Birthday":birthday,
        "MobileNo":mobile
    })
    const data = {"Student Created successfully":result}
    console.log(data);
    res.json(data)
}
catch(err){
    console.log(err);
    return res.json({status: 'error'});
}

})

module.exports = router;