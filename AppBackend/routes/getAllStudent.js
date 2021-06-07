const db = require('../config/db');
const express = require('express');
const router = express.Router();
const schema = require('../models/studentModel')

router.get('/alldetails',(req,res)=>{
    schema.find({}).then((Student)=>{
        console.log(Student)
        res.send(Student)
    })
});

module.exports = router;