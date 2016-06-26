var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var SeasonSchema = new Schema({
    _id:    Number,
    name:   String,
    begin:  Date,
    end:    Date
});

module.exports = mongoose.model('Season', SeasonSchema);
