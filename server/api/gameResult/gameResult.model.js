var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var GameResultSchema = new Schema({
    _game:      { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    _player:    { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    _race:      { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
    point:      Number
});

module.exports = mongoose.model('GameResult', GameResultSchema);