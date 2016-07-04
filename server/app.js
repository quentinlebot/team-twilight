var MODE = ['devel', 'test', 'prod'];
process.env.NODE_ENV = MODE[0];

var express =   require('express');
var mongoose =  require('mongoose');
var config =    require('./config/environment');

mongoose.connect(config.mongo.uri, config.mongo.options);

var app =       express();
var server =    require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);
if (config.seedDB) { require('./config/seeds'); }

app.listen(config.port, function () {
    console.log('Express server ( PORT:%s,  MODE:%s )', config.port, process.env.NODE_ENV);
});

exports = module.exports = app;