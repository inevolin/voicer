const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/js', express.static(__dirname + '/js'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(function(req, res) {
  console.error(404, req.url)
  res.status(404)
  res.send('404 not found.')
})

app.use(function(err, req, res, next) {
  console.error(err)
  res.status(500);
  res.send('500 something went wrong')
})

io.on('connection', (socket) => {
  let username = null;
  let roomId = null;
  console.log('connection');

  socket.on('disconnect', () => {
    console.log('disconnect');
  });

  socket.on('user/join', (data) => {
    username = data.name;
    roomId = data.roomId;
    if (!roomId || roomId.length <= 1) throw 'invalid room id';
    console.log('user/join', username, roomId);
    socket.join(roomId)
    io.in(roomId).emit('user/joined', {name: username})
  })
  socket.on('user/say', (data) => {
    if (!roomId || roomId.length <= 1) throw 'invalid room id';
    console.log('user/say', username, roomId);
    io.in(roomId).emit('user/said', {name: username, msg: data.msg})
  })
});

const port = 8080;
const host = '0.0.0.0'; // or localhost
http.listen(port, host, () => {
  console.log('listening on *:' + port);
});