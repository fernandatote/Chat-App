
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

//asking express to server client folder, in the root directory
app.use(express.static('client'));

//socket.io
var io = require('socket.io')(server);

var msgHistory = [];

io.on('connection', function (socket) {

    //when connected, display history of messages saved
    msgHistory.forEach((message) => {
        io.emit('message', message);
    })

  socket.on('message', function (msg) { //when a message is received
    //add messages to history
    msgHistory.push(msg);

    //emit message
    io.emit('message', msg);
    console.log(msgHistory);
  });
});

server.listen(8080, 'localhost', function () {
  var addr = server.address();
  console.log("Chat server running at", addr.address + ":" + addr.port);
});