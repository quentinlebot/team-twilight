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


var datas = [{
            rang: 1,
            name: 'J-F',
            score: 10,
            detail:'/ - 10',
            nb_game: 1
        },{
            rang: 2,
            name: 'Cerise',
            score: 10,
            detail:'4 - 6',
            nb_game: 2
        },{
            rang: 3,
            name: 'Quentin',
            score: 9,
            detail:'9 - /',
            nb_game: 1
        },{
            rang: 4,
            name: 'Thomas',
            score: 7,
            detail:'6 - 1',
            nb_game: 2
        },{
            rang: 5,
            name: 'Tony',
            score: 6,
            detail:'2 - 4',
            nb_game: 2
        },{
            rang: 6,
            name: 'George',
            score: 2,
            detail:'0 - 2',
            nb_game: 2
        }];

router.get('/signin', function (req, res) {
    res.render('home', { message: req.flash('err'), datas:datas });
});

router.get('/', auth.isAuthenticated, function (req, res) {
    res.render('home', { user: req.user, datas:datas });
});

module.exports = router;