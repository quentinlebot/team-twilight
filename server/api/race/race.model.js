var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var RaceSchema = new Schema({
	_id : 	Number,
    name : 	String,
    path : 	String
});

module.exports = mongoose.model('Race', RaceSchema);