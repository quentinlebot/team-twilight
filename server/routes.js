var User = require('./api/user/user.controller');
var auth = require('./auth/auth.service');

module.exports = function (app) {
    
    app.use('/', require('./auth'));
    app.use('/api/users',        require('./api/user'));
    app.use('/api/tiles',        require('./api/tile'));
    app.use('/api/players',      require('./api/player'));
    app.use('/api/races',        require('./api/race'));
    app.use('/api/maps',         require('./api/map'));
    app.use('/api/tilePicks',    require('./api/tilePick'));
    app.use('/api/seasons',      require('./api/season'));
    app.use('/api/games',        require('./api/game'));
    app.use('/api/gameResults',  require('./api/gameResult'));

    app.get('/map', function (req, res){
    	res.render('map', { user: req.user});
    });

    app.get('/racePick', function (req, res){
        res.render('racePick', {user:req.user});
    });

    app.get('/playerboard', function (req, res){
        res.render('playerboard', {user:req.user});
    });

    app.get('/player', auth.hasRole('Administrateur'), function (req, res){
        res.render('player', {user:req.user});
    });

    app.get('/gameresult', auth.hasRole('Administrateur'), function (req, res){
        res.render('gameresult', {user:req.user});
    });
    /*
    app.get('/users', auth.hasRole('Administrateur'), function (req, res) {
        User.view(req, res);
    });
    */
}