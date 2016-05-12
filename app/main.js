require('./devServer.js');

import menubar from 'menubar';
import portfinder from 'portfinder';
import server from './services/server.js';

// Random Port from 8000
portfinder.getPort((portErr, port) => {
  if (portErr) {
    console.error('Fatal! Cannot bind any port for initialize.');
  } else {
    process.env.SERVICE_PORT = port;

    server.listen(port, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('SpeakerSyncd Service running on port: %s', port);
        server.publishService();
      }
    });

    const mb = menubar({
      index: `file://${__dirname}/index.html`,
      icon: `${__dirname}/icon@2x.png`,
      'always-on-top': true,
      width: 320,
      height: 240,
    });

    mb.on('ready', () => {

    });

    mb.on('show', () => {
      mb.window.webContents.openDevTools();
    });
  }
});
