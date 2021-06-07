const db = require('../config/db');
const schema = require('../models/studentModel');
const express = require('express');
const router = express.Router();

router.put('/showdetails/:UserEmail',(req,res)=>{
    console.log(req.params.UserEmail)
    schema.find({UserEmail: req.params.UserEmail}).then((Student)=>{
        console.log(Student)
        res.send(Student)
    })
});

module.exports = router;