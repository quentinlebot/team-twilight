var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var MapSchema = new Schema({
    _tiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TilePick' }]
});

module.exports = mongoose.model('Map', MapSchema);