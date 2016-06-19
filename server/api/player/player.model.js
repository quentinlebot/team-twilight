var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var PlayerSchema = new Schema({
	_id : 	Number,
    name: 	String
});

module.exports = mongoose.model('Player', PlayerSchema);