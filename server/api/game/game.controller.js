var _ =             require('lodash');
var Game =          require('./game.model');

exports.index = function (req, res) {
    Game.find(function (err, games) {
        if (err) { return handleError(res, err); }
        return res.status(200).send(games);
    });
};

exports.show = function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if (err) { return handleError(res, err); }
        if (!game) { return res.send(404); }
        return res.send(game);
    });
};

exports.create = function (req, res) {
    Game.create(req.body, function (err, game) {
        if (err) { return handleError(res, err); }
        return res.status(201).send(game);
    });
};

exports.destroy = function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if (err) { return handleError(res, err); }
        if (!game) { return res.send(404); }
        Game.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(204).end();
        });
    });
};

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
};