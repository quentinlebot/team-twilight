var _ = require('lodash');
var Tile = require('./tile.model');

exports.index = function(req, res) {
    Tile.find(function (err, tile_maps) {
        if(err) { return handleError(res, err); }
        return res.json(200, tile_maps);
    });
};

exports.indexRandom = function(req, res) {
    var randomTiles = [];
    var nbPlayer =  req.params.nbPlayer;
    var nbAnomaly = paramsNbPlayer[nbPlayer].nbAnomaly; 
    var nbEmpty =   paramsNbPlayer[nbPlayer].nbEmpty; 
    var nbRegular = paramsNbPlayer[nbPlayer].nbRegular;
    var nbDelete =  paramsNbPlayer[nbPlayer].nbDelete;

    Tile.find({type: Tile.ANOMALY}, function (err, anomalys) {
        if(err) { return handleError(res, err); }
        for (var i = 1; i <= nbAnomaly; i++) {
        var random_i = Math.floor(Math.random() * anomalys.length);
            randomTiles.push(anomalys[random_i]);
            anomalys.splice(random_i, 1);
        }
        Tile.find({type: Tile.EMPTY} , function (err, emptys) {
            if(err) { return handleError(res, err); }
            for (var i = 1; i <= nbEmpty; i++) {
                var random_i = Math.floor(Math.random() * emptys.length);
                randomTiles.push(emptys[random_i]);
                emptys.splice(random_i, 1);
            }
            Tile.find({type: Tile.REGULAR} , function (err, regulars) {
                if(err) { return handleError(res, err); }
                for (var i = 1; i <= nbRegular; i++) {
                var random_i = Math.floor(Math.random() * regulars.length);
                    randomTiles.push(regulars[random_i]);
                    regulars.splice(random_i, 1);
                }
                randomTiles = _.shuffle(randomTiles) ;   
                for (var i = 1; i <= nbDelete; i++) {
                    randomTiles.splice(Math.random() * randomTiles.length ,1) ;
                }
                Tile.findOne({type: Tile.OTHER, name: Tile.MECATOL} , function (err, mecatol) {
                    if(err) { return handleError(res, err); }
                    Tile.findOne({type: Tile.OTHER, name: Tile.NEXUS} , function (err, nexus) {
                        if(err) { return handleError(res, err); }
                        var coordoneArray = getCoordoneArray(nbPlayer);
                        randomTiles.forEach(function(tile){
                            var coor = coordoneArray.pop();
                            tile.x = (coor.i-coor.j/2-coor.k/2);
                            tile.y = (coor.k-coor.j)*Math.sqrt(3)/2;
                            tile.i = coor.i;
                            tile.j = coor.j;
                            tile.k = coor.k;
                        });
                        randomTiles.push(mecatol);
                        randomTiles.push(nexus);
                        Tile.findOne({type: Tile.HOME, name: Tile.NEUTRAL} , function (err, home) {
                            if(err) { return handleError(res, err); }
                            addHomeSystem(randomTiles, nbPlayer, home, function(completeLst){
                                listAnomaly(completeLst, function(lstAnomaly){
                                    resolveAnomaly(lstAnomaly, completeLst, function(validLst){
                                        res.json(200, validLst);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

exports.show = function(req, res) {
    Tile.findById(req.params.id, function (err, tile_map) {
        if(err) { return handleError(res, err); }
        if(!tile_map) { return res.send(404); }
        return res.json(tile_map);
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

function getErrorIndex(lst, cb){
    var indexToMove = [];
    for (var i = 0; i < lst.length; i++) {
        if(lst[i].type == Tile.ANOMALY){
            isNeighborsAnomaly(lst, i, function (isValid){
                if(!isValid)
                    indexToMove.push(i);
            });
        }
    }
    return cb(indexToMove)
}

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

function addHomeSystem(lst, nbPlayer, home_base, cb){
    for (var i = 0; i < nbPlayer; i++) {
        var home = {
            name:home_base.name,
            type:home_base.type,
            path:home_base.path,
            x:(paramsNbPlayer[nbPlayer].homes[i].i-paramsNbPlayer[nbPlayer].homes[i].j/2-paramsNbPlayer[nbPlayer].homes[i].k/2),
            y:(paramsNbPlayer[nbPlayer].homes[i].k-paramsNbPlayer[nbPlayer].homes[i].j)*Math.sqrt(3)/2,
            i:paramsNbPlayer[nbPlayer].homes[i].i,
            j:paramsNbPlayer[nbPlayer].homes[i].j,
            k:paramsNbPlayer[nbPlayer].homes[i].k
        }
        lst.push(home);
    }
    return cb(lst);
}

function isHome(coord, nbPlayer){
    var res = false;
    paramsNbPlayer[nbPlayer].homes.forEach(function(home){
        if(home.i == coord.i && home.j == coord.j && home.k == coord.k)
            res = true;
    });
    return res;
}

function isMecatol(coord){
    return mecatol.i == coord.i && mecatol.j == coord.j && mecatol.k == coord.k;
}

var mecatol = {i:0, j:0, k:0};

var neighborsRange1 = [
                    {i:1 , j:-1 , k:0}, {i:1 , j:0 , k:-1}, {i:0 , j:1 , k:-1},
                    {i:-1 , j:1 , k:0}, {i:-1 , j:0 , k:1}, {i:0 , j:-1 , k:1}];

var neighborsRange2 = [
                {i:1 , j:-1 , k:0}, {i:1 , j:0 , k:-1}, {i:0 , j:1 , k:-1},
                {i:-1 , j:1 , k:0}, {i:-1 , j:0 , k:1}, {i:0 , j:-1 , k:1},
                {i:2 , j:-1 , k:-1}, {i:2 , j:0 , k:-2}, {i:1 , j:1 , k:-2}, 
                {i:0 , j:2 , k:-2}, {i:-1 , j:2 , k:-1}, {i:-2 , j:2 , k:0}, 
                {i:-2 , j:1 , k:1}, {i:-2 , j:0 , k:2}, {i:-1 , j:-1 , k:2}, 
                {i:0 , j:-2 , k:2}, {i:1 , j:-2 , k:1}, {i:2 , j:-2 , k:0}];

var mecatolNeighbor = neighborsRange1;


// Définition des paramètres de la map
var paramsNbPlayer = {
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
