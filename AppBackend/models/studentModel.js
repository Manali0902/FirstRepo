var mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
	UserEmail:String,
	UserName:String,
	Password:String,
	Birthday:String,
	MobileNo:Number

});

Student = mongoose.model("student",studentSchema);

module.exports = Student;
 
