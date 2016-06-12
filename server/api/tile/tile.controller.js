var _ =         require('lodash');
var Tile =      require('./tile.model');

exports.show = function(req, res) {
    Tile.findById(req.params.id, function (err, tile_map) {
        if(err) { return handleError(res, err); }
        if(!tile_map) { return res.send(404); }
        return res.json(tile_map);
    });
};

exports.getTiles= function(type, nb, cb){
    var result = [];
    Tile.find({type: type} , function (err, tiles) {
        if(err) { return handleError(res, err); }
        for (var i = 1; i <= nb; i++) {
            var random_i = Math.floor(Math.random() * tiles.length);
            result.push(tiles[random_i]);
            tiles.splice(random_i, 1);
        }
        return cb(result);
    });
}

exports.getFromName = function(name, cb){
    Tile.findOne({type: Tile.OTHER, name: name} , function (err, tile) {
        if(err) { return handleError(res, err); }
        return cb(tile);
    });
}

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
}
