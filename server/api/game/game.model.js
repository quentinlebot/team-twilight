var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var GameSchema = new Schema({
    _id:        Number,
    _season:    { type: mongoose.Schema.Types.ObjectId, ref: 'Season' }
});

module.exports = mongoose.model('Game', GameSchema);