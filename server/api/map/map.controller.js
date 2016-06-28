var _ =                 require('lodash');
var GameMap =           require('./map.model');
var Map =      require('./map.controller');
var TilePickCtrl =      require('../tilePick/tilePick.controller');
var TilePick =          require('../tilePick/tilePick.model');
var Tile =              require('../tile/tile.model');

exports.new = function(req, res) {
    var nbPlayer = req.params.nbPlayer;
    var new_map = {};
    var gap = req.params.gap;
    if(gap == undefined || gap < 5)
        gap = 8;
    if(nbPlayer == undefined || nbPlayer > 8 || nbPlayer < 5)
        nbPlayer = 5;
    TilePickCtrl.getBaseTiles(nbPlayer, function(stdTiles){
        new_map._tiles = stdTiles;
        TilePickCtrl.getGameTiles(nbPlayer, function(gameTiles){
            new_map._tiles = _.concat(new_map._tiles, gameTiles);
            var listErrors = [];
            resolve(nbPlayer, new_map._tiles, function(systems_ok){
                new_map._tiles = systems_ok;
                //TilePickCtrl.save(new_map._tiles, function(){
                    //GameMap.create(new_map, function(err, map) {
                        //if(err) { return handleError(res, err); }
                        new_map.stats = buildStats(new_map, nbPlayer);
                        if(new_map.stats.gap > gap)
                            return Map.new(req, res);
                        else
                            return res.status(201).json({map:new_map});
                    //});
                //});
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

function getNeigborsR2(systems, coord){
    var neighbors = [];
    TilePick.NEIGHBORS_RANGE_2.forEach(function(neighbor){
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

function isNearHome(coord, systems, coord_ignor, nbPlayer){
    var result = false;
    var neighbors = getNeigbors(systems, coord);
    neighbors.forEach(function(item){
        TilePick.PARAMS_NBPLAYER[nbPlayer].homes.forEach(function(home){
            if(!(home.i == coord_ignor.i && home.j == coord_ignor.j && home.k == coord_ignor.k))
                if(home.i == item.i && home.j == item.j && home.k == item.k)
                    if(!result) result = true;
        });
    });
    return result;
}

function getRessInflu(coord, systems, nbPlayer){
    var ressource = 0;
    var influence = 0;
    var neighbors = getNeigborsR2(systems, coord);
    var neighborsValid = [];
    neighbors.forEach(function(item){
        if(!isNearHome(item, systems, coord, nbPlayer))
            neighborsValid.push(item);
    });
    neighborsValid.forEach(function(item){
        ressource+=item._tile.ressource;
        influence+=item._tile.influence;
    });
    return {
        ressource:ressource,
        influence:influence
    }
}

function buildStats(map, nbPlayer){
    var ri = getRessInflu(map._tiles[0], map._tiles, nbPlayer);
    var cumul = ri.ressource+ri.influence;

    var stats = {
        datas:[],
        maxIndex:0,
        maxValue:cumul,
        minIndex:0,
        minValue:cumul,
        gap:0
    }

    for (var i = 0; i < nbPlayer; i++) {
        ri = getRessInflu(map._tiles[i], map._tiles, nbPlayer);
        cumul = ri.ressource+ri.influence;
        if(cumul < stats.minValue){
            stats.minValue = cumul;
            stats.minIndex = i;
        }else if(cumul > stats.maxValue){
            stats.maxValue = cumul;
            stats.maxIndex = i;
        }
        stats.datas.push(ri);
    };

    stats.gap = stats.maxValue-stats.minValue;
    return stats;
}