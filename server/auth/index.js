var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');
var auth = require('./auth.service');

var router = express.Router();

router.post('/signin', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/signin',
    failureFlash : true
}));

router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/signin', function (req, res) {
    res.render('home', { message: req.flash('err') });
});

router.get('/', auth.isAuthenticated, function (req, res) {
    res.render('home', { user: req.user});
});

module.exports = router;