import bonjour from 'bonjour';

const bonjourInstance = bonjour();

export default function (socket) {
  // Scan LAN hosts
  socket.on('scan', () => {
    bonjourInstance.find({
      type: 'http',
    }, (service) => {
      if (service.name === 'SpeakerSyncd') {
        socket.emit('hostFound', {
          host: service.host,
          port: service.port,
          addresses: service.addresses,
        });
      }
    });
  });
}
