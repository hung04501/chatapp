var express = require('express');

var app = express()
var fs = require('fs');
var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
	
var PORT = 5000;
app.set('port', PORT);


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
server.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + server.address().port)
});