var mongoose =  require('mongoose');
var Schema =    mongoose.Schema;

var TilePickSchema = new Schema({
    _tile: { type: mongoose.Schema.Types.ObjectId, ref: 'Tile' },
    x:Number,
    y:Number,
    i:Number,
    j:Number,
    k:Number
});

TilePickSchema.statics.MECATOL_POS = {i:0, j:0, k:0};

TilePickSchema.statics.NEIGHBORS_RANGE_1 = [
                    {i:1 , j:-1 , k:0}, {i:1 , j:0 , k:-1}, {i:0 , j:1 , k:-1},
                    {i:-1 , j:1 , k:0}, {i:-1 , j:0 , k:1}, {i:0 , j:-1 , k:1}];

TilePickSchema.statics.NEIGHBORS_RANGE_2 = [
                {i:1 , j:-1 , k:0}, {i:1 , j:0 , k:-1}, {i:0 , j:1 , k:-1},
                {i:-1 , j:1 , k:0}, {i:-1 , j:0 , k:1}, {i:0 , j:-1 , k:1},
                {i:2 , j:-1 , k:-1}, {i:2 , j:0 , k:-2}, {i:1 , j:1 , k:-2},
                {i:0 , j:2 , k:-2}, {i:-1 , j:2 , k:-1}, {i:-2 , j:2 , k:0},
                {i:-2 , j:1 , k:1}, {i:-2 , j:0 , k:2}, {i:-1 , j:-1 , k:2},
                {i:0 , j:-2 , k:2}, {i:1 , j:-2 , k:1}, {i:2 , j:-2 , k:0}];

TilePickSchema.statics.PARAMS_NBPLAYER = {
    4:{
        nbAnomaly: 4,
        nbEmpty: 8,
        nbRegular: 20,
        nbDelete: 0,
        homes: [
            {i:-2,j:3,k:-1},
            {i:2,j:1,k:-3},
            {i:-2,j:-1,k:3},
            {i:2,j:-3,k:1}]
    },
    5:{
        nbAnomaly: 4,
        nbEmpty: 8,
        nbRegular: 20,
        nbDelete: 1,
        homes: [
            {i:-2,j:3,k:-1},
            {i:2,j:1,k:-3},
            {i:3,j:-3,k:0},
            {i:0,j:-3,k:3},
            {i:-3,j:0,k:3}]
    },
    6:{
        nbAnomaly: 4,
        nbEmpty: 8,
        nbRegular: 20,
        nbDelete: 2,
        homes: [
            {i:0,j:3,k:-3},
            {i:3,j:0,k:-3},
            {i:3,j:-3,k:0},
            {i:0,j:-3,k:3},
            {i:-3,j:0,k:3},
            {i:-3,j:3,k:0}]
    },
    7:{
        nbAnomaly: 9,
        nbEmpty: 12,
        nbRegular: 36,
        nbDelete: 4,
        homes: [
            {i:-2,j:-2,k:4},
            {i:-4,j:1,k:3},
            {i:1,j:-4,k:3},
            {i:0,j:4,k:-4},
            {i:4,j:0,k:-4},
            {i:-3,j:4,k:-1},
            {i:4,j:-3,k:-1}]
    },
    8:{
        nbAnomaly: 9,
        nbEmpty: 12,
        nbRegular: 36,
        nbDelete: 5,
        homes: [
            {i:4,j:-4,k:0},
            {i:-4,j:4,k:0},
            {i:2,j:2,k:-4},
            {i:-2,j:-2,k:4},
            {i:-4,j:1,k:3},
            {i:1,j:-4,k:3},
            {i:-1,j:4,k:-3},
            {i:4,j:-1,k:-3}]
    }
};

module.exports = mongoose.model('TilePick', TilePickSchema);
