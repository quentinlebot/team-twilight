var _ =                 require('lodash');
var GameMap =           require('./map.model');
var TilePickCtrl =      require('../tilePick/tilePick.controller');
var TilePick =          require('../tilePick/tilePick.model');
var Tile =              require('../tile/tile.model');

exports.new = function(req, res) {
    var nbPlayer = req.params.nbPlayer;
    var new_map = {};
    TilePickCtrl.getBaseTiles(nbPlayer, function(stdTiles){
        new_map._tiles = stdTiles;
        TilePickCtrl.getGameTiles(nbPlayer, function(gameTiles){
            new_map._tiles = _.concat(new_map._tiles, gameTiles);
            var listErrors = [];
            resolve(nbPlayer, new_map._tiles, function(systems_ok){
                new_map._tiles = systems_ok;
                TilePickCtrl.save(new_map._tiles, function(){
                    GameMap.create(new_map, function(err, map) {
                        if(err) { return handleError(res, err); }
                        return res.status(201).json({map:map});
                    });
                });
            });
        });
    });
};

exports.show = function(req, res) {
    GameMap.findById(req.params.id, function (err, map) {
        if(err) { return handleError(res, err); }
        if(!map) { return res.status(404); }
        return res.json(map);
    });
};

function resolve(nbPlayer, systems, cb){
    var tiles =  systems;
    invalidTiles(nbPlayer, systems).forEach(function(index){
        tiles = _.map(tiles, _.clone);
        var validLst = _.shuffle(validSlots(nbPlayer, tiles));
        if(validLst.length == 0)
            return(cb([]));
        tiles = switchIndex(validLst.pop(), index, tiles);
    });
    return cb(tiles);
}

function invalidTiles(nbPlayer, systems){
    var invalidLst = [];
    systems.forEach(function(item){
        var valid = isNeighborsValidIgnoreLst(systems, item, invalidLst, nbPlayer);
        if(item._tile.type == Tile.ANOMALY && !valid) invalidLst.push(systems.indexOf(item));
    });
    return invalidLst;
}

function validSlots(nbPlayer, systems){
    var validLst = [];
    systems.forEach(function(item){
        var valid = isNeighborsValid(systems, item, nbPlayer);
        var isNexus = item._tile.name == Tile.NEXUS;
        if(item._tile.type != Tile.ANOMALY 
            && valid 
            && !isHome(item, nbPlayer)
            && !isNexus) validLst.push(systems.indexOf(item));
    });
    return validLst;
}

function switchIndex(index1, index2, systems){
    var temp = systems[index1]._tile;
    if(systems[index1] != undefined && systems[index2] != undefined){
        systems[index1]._tile = systems[index2]._tile;
        systems[index2]._tile = temp;
    }
    return systems;
}

function isNeighborsValid(systems, coord, nbPlayer){
    var result = true;
    var neighbors = getNeigbors(systems, coord);
    neighbors.forEach(function(item){
        if(item._tile.type == Tile.ANOMALY /*|| isHome(item, nbPlayer)*/)
            if(result) result = false;
    });
    return result;
}

function isNeighborsValidIgnoreLst(systems, coord, ignore, nbPlayer){
    var result = true;
    var neighbors = getNeigbors(systems, coord);
    neighbors.forEach(function(item){
        if(item._tile.type == Tile.ANOMALY /*|| isHome(item, nbPlayer)*/){
            if(result){
                var index = systems.indexOf(item);
                var indexMustBeIgnore = ignore.indexOf(index) != -1;
                if(index != -1 && !indexMustBeIgnore){
                    result = false;
                }
            }
        }
    });
    return result;
}

function getNeigbors(systems, coord){
    var neighbors = [];
    TilePick.NEIGHBORS_RANGE_1.forEach(function(neighbor){
        var new_coord = {
            i:coord.i+neighbor.i,
            j:coord.j+neighbor.j,
            k:coord.k+neighbor.k
        }
        systems.forEach(function(tilePick){
            if(tilePick.i == new_coord.i &&
                tilePick.j == new_coord.j &&
                tilePick.k == new_coord.k)
                neighbors.push(tilePick);
        });
    });
    return neighbors;
}

function handleError(res, err) {
    console.log(err);
    return res.status(500).json(err);
}

function isHome(coord, nbPlayer){
    var result = false;
    TilePick.PARAMS_NBPLAYER[nbPlayer].homes.forEach(function(home){
        if(home.i == coord.i && home.j == coord.j && home.k == coord.k)
            if(!result) result = true;
    });
    return result;
}