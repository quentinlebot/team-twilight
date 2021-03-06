var _ =             require('lodash');
var GameResult =    require('./gameResult.model');
var Game =          require('../game/game.model');

exports.index = function (req, res) {
    GameResult.find(function (err, gameResults) {
        if (err) { return handleError(res, err); }
        return res.status(200).send(gameResults);
    });
};

exports.getSeason = function (req, res) {
    var season_id = req.params.season_id;
    var games = Game.find({_season:season_id}, function(err, games){
        const listGamesId = _(games).map(g=>g._id).value();
        GameResult.where('_game')
            .in(listGamesId)
            .exec(function (err, gameResults) {
            if (err) { return handleError(res, err); }
            return res.status(200).send(gameResults);
        });
    });
};

exports.getSeasonF = function (season_id, cb){
    var games = Game.find({_season:season_id}, function(err, games){
        const listGamesId = _(games).map(g=>g._id).value();
        GameResult.where('_game')
            .in(listGamesId)
            .exec(function (err, gameResults) {
            return cb(gameResults);
        });
    });
}

exports.getBestSeasonPlayer = function (req, res) {
    var season_id = req.params.season_id;
    var games = Game.find({_season:season_id}, function(err, games){
        const listGamesId = _(games).map(g=>g._id).value();
        GameResult
            .where('_game').in(listGamesId)
            .where('_player').in(req.params.player_id)
            .exec(function (err, gameResults) {
            if (err) { return handleError(res, err); }
            var fourBestGameId = [];

            for (var i = 0; i < 4; i++) {
                var best = {}
                if(gameResults[0] != undefined){
                    best = gameResults[0];
                    for (var j = 1; j < gameResults.length; j++) {
                        if(gameResults[j].point > best.point){
                            best = gameResults[j];
                        }
                    }
                    gameResults.splice(gameResults.indexOf(best), 1);
                    fourBestGameId.push(best._id);
                }
            }            
            return res.status(200).send(fourBestGameId);
        });
    });
}

exports.getGame = function (req, res) {
    GameResult.find({_game:req.params.game_id})
        .exec(function (err, gameResults) {
        if (err) { return handleError(res, err); }
        return res.status(200).send(gameResults);
    });  
};

exports.show = function (req, res) {
    GameResult.findById(req.params.id, function (err, gameResult) {
        if (err) { return handleError(res, err); }
        if (!gameResult) { return res.send(404); }
        return res.send(gameResult);
    });
};

exports.create = function (req, res) {
    GameResult.create(req.body, function (err, gameResult) {
        if (err) { return handleError(res, err); }
        return res.status(201).send(gameResult);
    });
};

exports.destroy = function (req, res) {
    GameResult.findById(req.params.id, function (err, gameResult) {
        if (err) { return handleError(res, err); }
        if (!gameResult) { return res.send(404); }
        GameResult.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(204).end();
        });
    });
};

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
};