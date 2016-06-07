var LocalStrategy = require('passport-local').Strategy;
var User = require('../api/user/user.model');

module.exports = function (passport) {
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    
    passport.use('local-login', new LocalStrategy({
        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, login, password, done) {
        User.findOne({ 'login' : login }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, req.flash('err', 'L\'identifiant saisi n\'existe pas.'));
            if (!user.authenticate(password)) return done(null, false, req.flash('err', 'Le mot de passe saisi n\'est pas valide.'));
            return done(null, user);
        });
    }));
};
