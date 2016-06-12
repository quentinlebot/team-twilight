var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var TileSchema = new Schema({
    name: String,
    path: String,
    type: String,
    ressource: Number,
    influence: Number,
    techno: String
});

TileSchema.statics.EMPTY = 			'empty';
TileSchema.statics.REGULAR = 		'regular';
TileSchema.statics.ANOMALY = 		'anomaly';
TileSchema.statics.HOME = 			'home';
TileSchema.statics.OTHER = 			'other';

TileSchema.statics.MECATOL = 		'Mecatol Rex';
TileSchema.statics.NEXUS = 			'Wormhole Nexus';
TileSchema.statics.NEUTRAL =		'Neutral';


TileSchema.methods.build_Path = function (file_name){
  return this.path = 'assets/images/systems/' + this.type + '/' + file_name;
}

module.exports = mongoose.model('Tile', TileSchema);
