var _ =             require('lodash');
var TilePick =      require('./tilePick.model');
var TileCtrl =      require('../Tile/tile.controller');
var Tile =          require('../Tile/tile.model');


exports.save = function(lst, cb){
    lst.forEach(function(item){
        TilePick.create(item, function(err, tilePick) {
            if(err) { return console.log(err); }
        });    
    });
    return cb();
};

exports.getGameTiles = function(nbPlayer, cb) {
    var randomTiles = [];
    var randomTilePick = [];
    var nbAnomaly = TilePick.PARAMS_NBPLAYER[nbPlayer].nbAnomaly; 
    var nbEmpty =   TilePick.PARAMS_NBPLAYER[nbPlayer].nbEmpty; 
    var nbRegular = TilePick.PARAMS_NBPLAYER[nbPlayer].nbRegular;
    var nbDelete =  TilePick.PARAMS_NBPLAYER[nbPlayer].nbDelete;

    TileCtrl.getTiles(Tile.ANOMALY, nbAnomaly, function(anomalys){
        randomTiles = _.concat(randomTiles, anomalys);
        TileCtrl.getTiles(Tile.EMPTY, nbEmpty, function(emptys){
            randomTiles = _.concat(randomTiles, emptys);
            TileCtrl.getTiles(Tile.REGULAR, nbRegular, function(regulars){
                randomTiles = _.concat(randomTiles, regulars);
                randomTiles = _.shuffle(randomTiles);

                for (var i = 0; i < nbDelete; i++) {
                    randomTiles.splice(Math.random() * randomTiles.length ,1) ;
                }

                var coordoneArray = getCoordoneArray(nbPlayer);
                coordoneArray = _.shuffle(coordoneArray);

                randomTiles.forEach(function(tile){
                    var tileP = new TilePick();
                    var coor = coordoneArray.pop();
                    tileP.x = (coor.i - coor.j / 2 - coor.k / 2);
                    tileP.y = (coor.k - coor.j) * Math.sqrt(3) / 2;
                    tileP.i = coor.i;
                    tileP.j = coor.j;
                    tileP.k = coor.k;
                    tileP.tile = tile;
                    randomTilePick.push(tileP);
                });

                return cb(randomTilePick);
            });
        });
    });
};

exports.getBaseTiles = function(nbPlayer, cb){
    var StdTiles = [];
    addHomeSystem(StdTiles, nbPlayer, function(homeTiles){
        addOtherSystem(homeTiles, function(othersTiles){
            return cb(othersTiles);
        });
    });
};

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
}

function addHomeSystem(lst, nbPlayer, cb){
    TileCtrl.getFromName(Tile.HOME , function (home) {
        for (var i = 0; i < nbPlayer; i++) {
            var tilePick = new TilePick();
            tilePick.tile = home,
            tilePick.x = (TilePick.PARAMS_NBPLAYER[nbPlayer].homes[i].i-TilePick.PARAMS_NBPLAYER[nbPlayer].homes[i].j/2-TilePick.PARAMS_NBPLAYER[nbPlayer].homes[i].k/2),
            tilePick.y = (TilePick.PARAMS_NBPLAYER[nbPlayer].homes[i].k-TilePick.PARAMS_NBPLAYER[nbPlayer].homes[i].j)*Math.sqrt(3)/2,
            tilePick.i = TilePick.PARAMS_NBPLAYER[nbPlayer].homes[i].i,
            tilePick.j = TilePick.PARAMS_NBPLAYER[nbPlayer].homes[i].j,
            tilePick.k = TilePick.PARAMS_NBPLAYER[nbPlayer].homes[i].k
            lst.push(tilePick);
        }
        return cb(lst);
    });
};

function addOtherSystem(lst, cb){
    TileCtrl.getFromName(Tile.MECATOL , function (mecatol) {
        TileCtrl.getFromName(Tile.NEXUS , function (nexus) {
            buildTileProp(mecatol, function(mecatolTilePick){
                buildTileProp(nexus, function(nexusTilePick){
                    lst.push(mecatolTilePick);
                    lst.push(nexusTilePick);
                    return cb(lst);
                });
            });
        });
    });
}

function buildTileProp(tile, cb){
    var tileP = new TilePick();
    tileP.tile = tile;
    tileP.i = 0;
    tileP.j = 0;
    tileP.k = 0;
    tileP.x = 0;
    tileP.Y = 0;
    if(tile.name == Tile.NEXUS){
        tileP.x = -8;
        tileP.y = -5;
    }
    return cb(tileP);
}

exports.show = function(req, res) {
    TilePickCtrl.findById(req.params.id, function (err, tile_map) {
        if(err) { return handleError(res, err); }
        if(!tile_map) { return res.send(404); }
        return res.json(tile_map);
    });
};

function getCoordoneArray(nbPlayer){
    var result = [];
    var range = 4;
    if(nbPlayer>6)
        range = 5;
    for (var i = -range+1; i < range; i++) {
        for (var j = -range+1; j < range; j++) {
            for (var k = -range+1; k < range; k++) {
                if(i+j+k === 0){
                    var pos = {i:i,j:j,k:k};
                    if(!isHome(pos, nbPlayer) && !isMecatol(pos))
                        result.push(pos);
                }
            };
        };
    };
    return result;
}

function isHome(coord, nbPlayer){
    var res = false;
    TilePick.PARAMS_NBPLAYER[nbPlayer].homes.forEach(function(home){
        if(home.i == coord.i && home.j == coord.j && home.k == coord.k)
            res = true;
    });
    return res;
}

function isMecatol(coord){
    return TilePick.MECATOL_POS.i == coord.i && TilePick.MECATOL_POS.j == coord.j && TilePick.MECATOL_POS.k == coord.k;
}