var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/src'));

var port = 1001
app.listen(port, function(){
	console.log('server listening on port ' + port);
})

module.exports = app;