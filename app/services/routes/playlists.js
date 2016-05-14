import { Router } from 'express';
import db from '../database.js';
import RouteKeeper from 'express-route-keeper';

const router = new Router();
const keeper = new RouteKeeper();

router.get('/', (req, res) => {
  db.get('PLAYLISTS', (err, val) => {
    if (err) {
      console.error(err);
    } else {
      res.json(val);
    }
  });
});

router.put('/:playlistId/songs', keeper({
  songs: Array,
}), (req, res) => {
  db.get('PLAYLISTS', (err, playlists) => {
    if (err) {
      return console.error(err);
    }

    const playlist = playlists.find((item) => item.id === req.params.playlistId);

    if (!playlist) {
      res.status(400);
      return res.json({
        message: 'Playlist not found',
      });
    }

    playlist.songs = req.body.songs;

    return db.put('PLAYLISTS', playlists, (putErr) => {
      if (putErr) {
        console.error(putErr);
      } else {
        res.json({
          playlist,
        });
      }
    });
  });
});

export default router;
