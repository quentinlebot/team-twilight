﻿var User = require('./api/user/user.controller');
var auth = require('./auth/auth.service');

module.exports = function (app) {
    
    app.use('/', require('./auth'));
    app.use('/api/users',       require('./api/user'));
    app.use('/api/tiles',       require('./api/tile'));
    app.use('/api/players',     require('./api/player'));
    app.use('/api/races',       require('./api/race'));
    app.use('/api/map',         require('./api/map'));
    app.use('/api/tilePick',    require('./api/tilePick'));
    app.use('/api/season',        require('./api/season'));
    app.use('/api/game',        require('./api/game'));
    app.use('/api/gameResult',  require('./api/gameResult'));

    app.get('/map', function (req, res){
    	res.render('map');
    });

    app.get('/entity', function (req, res){
        res.render('entity');
    });

    app.get('/player', function (req, res){
        res.render('player');
    });
    
    app.get('/users', auth.hasRole('Administrateur'), function (req, res) {
        User.view(req, res);
    });

}