var _ = require('lodash');
var Player = require('./player.model');

exports.index = function (req, res) {
    Player.find(function (err, players) {
        if (err) { return handleError(res, err); }
        return res.status(200).send(players);
    });
};

exports.show = function (req, res) {
    Player.findById(req.params.id, function (err, player) {
        if (err) { return handleError(res, err); }
        if (!player) { return res.send(404); }
        return res.send(player);
    });
};

exports.create = function (req, res) {
    Player.create(req.body, function (err, player) {
        if (err) { return handleError(res, err); }
        return res.status(201).send(player);
    });
};

exports.destroy = function (req, res) {
    Player.findById(req.params.id, function (err, player) {
        if (err) { return handleError(res, err); }
        if (!player) { return res.send(404); }
        Player.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(204).end();
        });
    });
};

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
};