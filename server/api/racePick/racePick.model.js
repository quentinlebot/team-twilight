var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var RacePickSchema = new Schema({
    _races: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Race' }],
    _select: { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
    _player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
});

module.exports = mongoose.model('RacePick', RacePickSchema);