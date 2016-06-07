var _ = require('lodash');
var User = require('./user.model');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

exports.index = function (req, res) {
    User.find(function (err, users) {
        if (err) { return handleError(res, err); }
        return res.status(200).send(users);
    });
};

exports.show = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
        if (!user) { return res.send(404); }
        return res.send(user);
    });
};

exports.create = function (req, res) {
    User.create(req.body, function (err, user) {
        if (err) { return handleError(res, err); }
        return res.status(201).send(user);
    });
};

exports.update = function (req, res) {
    if (req.body._id) { delete req.body._id; }
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
        if (!user) { return res.send(404); }
        if (user.role == config.userRoles[config.adminRoleIndex]) delete req.body.role;
        if (req.body.password !== user.hashedPassword) req.body.hashedPassword = user.encryptPassword(req.body.password);
        var updated = _.merge(user, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).send(user);
        });
    });
};

exports.active = function (req, res) {
    if (req.body) { delete req.body; }
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
        if (!user) { return res.send(404); }
        var updated = _.merge(user, { active: !user.active });
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).send(user);
        });
    });
};

exports.destroy = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
        if (!user) { return res.send(404); }
        user.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(204).end();
        });
    });
};

exports.view = function (req, res) {
    User.find(function (err, users) {
        if (err) { return handleError(res, err); }
        res.render('user', { datas: users, user: req.user.login, authLvl: auth.getAuthLvl(req) });
    });
}

exports.getRoles = function (req, res) {
    var roles = [];
    for (var data in config.userRoles) {
        if (config.userRoles[config.adminRoleIndex] !== config.userRoles[data]) roles.push(config.userRoles[data]);
    }
    res.status(200).send(roles);
}

function handleError(res, err) {
    return res.status(500).send(err);
}