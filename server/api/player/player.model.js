var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var PlayerSchema = new Schema({
	_id : 	Number,
    name: 	String,
    path: 	{type:String, default:'assets/images/players/avatar_circle_blue.png'}
});

module.exports = mongoose.model('Player', PlayerSchema);