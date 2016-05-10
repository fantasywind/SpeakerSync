import { Router } from 'express';
import db from '../database.js';

const router = new Router();

router.get('/', (req, res) => {
  db.get('PLAYLISTS', (err, val) => {
    if (err) {
      if (err.name === 'NotFoundError') {
        db.put('PLAYLISTS', [], {
          encoding: 'json',
        });
        res.json([]);
      } else {
        console.error(err);
      }
    } else {
      res.json(val);
    }
  });
});

export default router;
