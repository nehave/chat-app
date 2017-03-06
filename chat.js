var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendfile('chat.html');

});


users = [];

io.on('connection', function(socket)
{
  console.log('A user connected');
  socket.on('setUsername', function(data)
  {
    console.log(data);
      socket.emit('userSet', {username: data});
  });
  socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
  })
});
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});