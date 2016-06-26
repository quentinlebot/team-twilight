var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var GameResultSchema = new Schema({
    _game:      Number,
    _player:    Number,
    _race:      Number,
    point:      Number,
    bonus:      {type:Number, default:0}
});


GameResultSchema
  .virtual('total')
  .get(function () {
    return this.point+this.bonus;
});

module.exports = mongoose.model('GameResult', GameResultSchema);