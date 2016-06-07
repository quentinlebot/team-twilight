var express =       require('express');
var path =          require('path');
var logger =        require('morgan');
var cookieParser =  require('cookie-parser');
var bodyParser =    require('body-parser');
var session =       require('express-session');
var config =        require('./environment');
var compression =   require('compression');
var passport =      require('passport');
var flash =         require('connect-flash');

require('../auth/passport')(passport);

module.exports = function (app) {
    
    app.set('views', config.root + '/server/views');
    app.set('view engine', 'jade');
    
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(compression());
    
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    
    app.use(session({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: true
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }
    
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}