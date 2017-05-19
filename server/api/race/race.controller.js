var _ = require('lodash');
var Race = require('./race.model');

exports.index = function (req, res) {
    Race.find(function (err, races) {
        if (err) { return handleError(res, err); }
        return res.status(200).send(races);
    });
};

exports.show = function (req, res) {
    Race.findById(req.params.id, function (err, race) {
        if (err) { return handleError(res, err); }
        if (!race) { return res.send(404); }
        return res.send(race);
    });
};

exports.pick = function (req, res) {
    var nbPlayer = req.params.nbPlayer;
    if(nbPlayer > 8) nbPlayer = 8;
    else if(nbPlayer < 4) nbPlayer = 4;

    Race.find(function (err, races){
        var nbRacePerPlayer = Math.floor(races.length/nbPlayer);
        nbRacePerPlayer = nbRacePerPlayer > 3 ? 3 : nbRacePerPlayer; 
        var pick = [];
        for (var i = 0; i < nbRacePerPlayer; i++) {
            for (var j = 0; j < nbPlayer; j++) {
                if(i==0){
                    var racePick = [];
                    pick.push(racePick);
                }
                var random_i = Math.floor(Math.random() * races.length);
                pick[j].push(races[random_i]);
                races.splice(random_i, 1);
            }
        }
        return res.status(200).send(pick);
    });
}

exports.create = function (req, res) {
    Race.create(req.body, function (err, race) {
        if (err) { return handleError(res, err); }
        return res.status(201).send(race);
    });
};

exports.destroy = function (req, res) {
    Race.findById(req.params.id, function (err, race) {
        if (err) { return handleError(res, err); }
        if (!race) { return res.send(404); }
        Race.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(204).end();
        });
    });
};

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
};
