const schema  = require('../models/studentModel');
// const del = require('../models/deletedStudents');
var express = require('express');
var router = express.Router();
router.delete('/remove/:id',(req,res)=>{
  console.log(req.params.id);

  schema.findByIdAndRemove({ _id:req.params.id }, function (err) {
    if(err) console.log(err);
    else{
      console.log("Successful deletion");
      res.send("Deleted Successfully")
    }
  });
});
module.exports = router;