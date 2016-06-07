var compose = require('composable-middleware');
var config = require('../config/environment');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else res.redirect('/signin');
}

function hasRole(role) {
    if (!role) throw new Error('Un rôle est obligatoire');
    if (config.userRoles.indexOf(role) === -1) throw new Error('Le rôle n\'est pas connu.');
    return compose()
      .use(function meetsRequirements(req, res, next) {
        if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(role)) isAuthenticated(req, res, next);
        else res.send(403);
    });
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;