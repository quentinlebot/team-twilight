var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var GameSchema = new Schema({
    _id:        Number,
    _season:    Number
});

module.exports = mongoose.model('Game', GameSchema);