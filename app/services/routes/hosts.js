import bonjour from 'bonjour';

const bonjourInstance = bonjour();

export default function (socket) {
  const SERVICE_PORT = parseInt(process.env.SERVICE_PORT, 10);

  // Scan LAN hosts
  socket.on('scan', () => {
    bonjourInstance.find({
      type: 'http',
    }, (service) => {
      if (service.name.match(/SpeakerSyncd-/) && service.port !== SERVICE_PORT) {
        socket.emit('hostFound', {
          host: service.host,
          port: service.port,
          addresses: service.addresses,
        });
      }
    });
  });
}
