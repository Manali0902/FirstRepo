var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
		imagename: String
});

//Image is a model which has a schema imageSchema
Image = mongoose.model('Image', imageSchema);

module.exports = Image;
