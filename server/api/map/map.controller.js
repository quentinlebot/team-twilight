var _ =                 require('lodash');
var GameMap =           require('./map.model');
var TilePickCtrl =      require('../tilePick/tilePick.controller');
var TilePick =          require('../tilePick/tilePick.model');
var Tile =              require('../tile/tile.model');

exports.new = function(req, res) {
    var nbPlayer = req.params.nbPlayer;
    var new_map = {};
    TilePickCtrl.getBaseTiles(nbPlayer, function(stdTiles){
        new_map.tiles = _.concat(new_map.tiles, stdTiles);
        TilePickCtrl.getGameTiles(nbPlayer, function(gameTiles){
            new_map.tiles = _.concat(new_map.tiles, gameTiles);
            TilePickCtrl.save(new_map.tiles, function(){
                GameMap.create(new_map, function(err, map) {
                    if(err) { return handleError(res, err); }
                    return res.status(201).json({map:new_map});
                });
            });
        });
    });
};

exports.show = function(req, res) {
    GameMap.findById(req.params.id, function (err, map) {
        if(err) { return handleError(res, err); }
        if(!map) { return res.send(404); }
        return res.json(map);
    });
};

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
}


function listAnomaly(systems, cb){
    var anomalys = [];
    systems.forEach(function(item){
        if(item.type === Tile.ANOMALY) 
            anomalys.push(systems.indexOf(item));
    });
    return cb(anomalys);
}

function resolveAnomaly(anomalys, systems, cb){
    if(anomalys.length == 0)
        return cb(systems);
    var indexAnomaly = anomalys.pop();
    isNeighborsValid(systems, indexAnomaly, indexAnomaly, function(valid){
        if(!valid){
            var indexRandom = Math.floor(Math.random() * systems.length);
            findNextValidIndex(indexRandom, indexAnomaly, systems, function(validIndex){
                switchPositions(validIndex, indexAnomaly, systems, function(systemsSwitch){
                    return resolveAnomaly(anomalys, systemsSwitch, cb);
                });
            });
        }else
            return resolveAnomaly(anomalys, systems, cb);
    });
}

function findNextValidIndex(index, ignorIndex, systems, cb){
    index++;
    if(index == 200)
        console.log(systems);
    var indexTemp = index % systems.length;
    if(systems[indexTemp].type != Tile.REGULAR && systems[indexTemp].type != Tile.EMPTY){
        return findNextValidIndex(indexTemp, ignorIndex, systems, cb);
    }
    else{
        isNeighborsValid(systems, indexTemp, ignorIndex, function(valid){
            if(valid) return cb(indexTemp);
            else{
                return findNextValidIndex(indexTemp, ignorIndex, systems, cb);
            }
        });
    }
}

function switchPositions(index1, index2, lst, cb){
    //console.log("switch : "+lst[index1].name+" "+lst[index2].name);
    if(index1 != -1 && index2 != -1){
        var temp = {
            name:lst[index1].name,
            type:lst[index1].type,
            path:lst[index1].path,
            ressource:lst[index1].ressource,
            influence:lst[index1].influence,
        };
        lst[index1].name = lst[index2].name;
        lst[index1].type = lst[index2].type;
        lst[index1].path = lst[index2].path;
        lst[index1].ressource = lst[index2].ressource;
        lst[index1].influence = lst[index2].influence;

        lst[index2].name = temp.name;
        lst[index2].type = temp.type;
        lst[index2].path = temp.path;
        lst[index2].ressource = temp.ressource;
        lst[index2].influence = temp.influence;
    }
    return cb(lst);
}

function isNeighborsValid (lst_sys, index, ignorIndex, cb) {
    var result = true;
    neighborsRange1.forEach(function(neighbor){
        indexFromCoord(
            lst_sys[index].i + neighbor.i, 
            lst_sys[index].j + neighbor.j, 
            lst_sys[index].k + neighbor.k, 
            lst_sys, function (newindex){
                if(newindex != ignorIndex){
                    if(isMecatolNeighbor(newindex, lst_sys) && countMecatolNeighborAnomaly(lst_sys) >= 2)
                        result = false;
                    if(lst_sys[newindex].type == Tile.ANOMALY | lst_sys[newindex].type == Tile.HOME)
                        if(result)
                            result = false;
                }
            });
    });
    return cb(result);
}

function isMecatolNeighbor(index, lst_sys){
    var result = false;
    mecatolNeighbor.forEach(function(item){
        indexFromCoord(item.i, item.j, item.k, lst_sys, function(indexMecatolNeighbor){
            if(indexMecatolNeighbor == index) 
                if(!result) result = true;
        });
    });
    return result;
}

function countMecatolNeighborAnomaly(lst_sys){
    var counter = 0;
    mecatolNeighbor.forEach(function(item){
        indexFromCoord(item.i, item.j, item.k, lst_sys, function(indexMecatolNeighbor){
            if(lst_sys[indexMecatolNeighbor].type == Tile.ANOMALY) counter++;
        });
    });
    return counter;
}

function indexFromCoord (i, j, k, lst_sys, cb) {
    lst_sys.forEach(function(item){
        if (item.i == i && item.j == j && item.k == k)
            return cb(lst_sys.indexOf(item));
    });
}