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