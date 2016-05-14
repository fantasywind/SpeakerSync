import bonjour from 'bonjour';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketBinder from './lib/socketBinder.js';

import playlistRoutes from './routes/playlists.js';

const bonjourInstance = bonjour();

const app = express();

app.use(bodyParser.json());

app.use('/playlists', playlistRoutes);

const server = http.createServer(app);
socketBinder(server);

server.publishService = () => {
  // Publish Service
  bonjourInstance.publish({
    name: `SpeakerSyncd-${Date.now()}`,
    type: 'http',
    port: process.env.SERVICE_PORT,
  });
};

export default server;
