var express = require('express');
var mongodb = require('mongodb');

var app = express()
var fs = require('fs');
var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
	
var port = 5000;
app.set('port', port);


app.get('/', function(resuest, response) {
  response.sendFile(__dirname+'/index.html');
});

//socket

io.sockets.on('connection', function(socket) {
	socket.on('sendchat', function (data) {
		io.sockets.emit('updatechat', socket.username, data);
	});
  
  socket.on('adduser', function(username) {
		socket.username = username;
		socket.broadcast.emit('new-user', username);
	});
		
});
//port
server.listen(port, function () {
  console.log('Listening on port ' + server.address().port)
});