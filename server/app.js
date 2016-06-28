var MODE = ['devel', 'test', 'prod'];
process.env.NODE_ENV = MODE[1];

var express = 	require('express');
var mongoose = 	require('mongoose');
var config = 	require('./config/environment');

mongoose.connect(config.mongo.uri, config.mongo.options);

var app = 		express();
var server = 	require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);
if (config.seedDB) { require('./config/seeds'); }

server.listen(config.port, config.ip, function () {
    console.log('Express server ( IP: %s, PORT:%s,  MODE:%s )', config.ip, config.port, process.env.NODE_ENV);
});

exports = module.exports = app;