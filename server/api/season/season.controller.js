var _ = require('lodash');
var Season = require('./season.model');

exports.index = function (req, res) {
    Season.find(function (err, seasons) {
        if (err) { return handleError(res, err); }
        return res.status(200).send(seasons);
    });
};

exports.show = function (req, res) {
    Season.findById(req.params.id, function (err, season) {
        if (err) { return handleError(res, err); }
        if (!season) { return res.send(404); }
        return res.send(season);
    });
};

exports.create = function (req, res) {
    Season.create(req.body, function (err, season) {
        if (err) { return handleError(res, err); }
        return res.status(201).send(season);
    });
};

exports.destroy = function (req, res) {
    Season.findById(req.params.id, function (err, season) {
        if (err) { return handleError(res, err); }
        if (!season) { return res.send(404); }
        Season.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(204).end();
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}