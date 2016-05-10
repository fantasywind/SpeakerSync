import socketIO from 'socket.io';
import hosts from '../routes/hosts.js';

export default function (server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('socket connected.');
    hosts(socket);
  });
}
