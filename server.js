const express = require('express');
const ejs = require('ejs');
const app = express();
const { Server } = require('socket.io');
const { createServer } = require('http');

const port = process.env.PORT || 3000;

const httpServer = createServer(app);

const socketIo = new Server(httpServer);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

const userList = {};

socketIo.on('connection', (socket) => {
  //   console.log(socket.id, ' connected');
  const { name, token } = socket.handshake.auth;
  socket.user = { name, token };
  userList[token] = {
    name: socket.user.name,
    token: socket.user.token,
    score: 0,
    status: 'player',
  };
  userConnection(socket, userList);
});

function userConnection(socket, userList) {
  //inform user their now connected
  socket.emit('user:connected', { user: socket.user.name, userList });

  //   notify others that someone is in
  socket.broadcast.emit('user:join', { user: socket.user.name, userList });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user:disconnect', { user: socket.user.name, userList });
  });
  console.log(userList);
}

httpServer.listen(port, () => {
  console.log('server started on port ', port);
});
