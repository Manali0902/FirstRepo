const schema  = require('../models/studentModel');
var express = require('express');
var router = express.Router();

router.put('/update/:id',(req,res)=>{
    schema.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        res.send("Updated Successfully\n")
      })
});

module.exports = router;