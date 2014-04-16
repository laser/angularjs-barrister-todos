
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , http = require('http')
  , path = require('path')
  , barrister = require('barrister')
  , store = require("./store").store
  , service = require("./service").service(store)
  , idl = JSON.parse(fs.readFileSync("./interface.json").toString());

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server = new barrister.Server(idl);
server.addHandler('TodoService', service)

require('./routes/todos')(app, server);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
