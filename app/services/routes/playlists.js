import { Router } from 'express';
import db from '../database.js';

const router = new Router();

router.get('/', (req, res) => {
  db.get('PLAYLISTS', (err, val) => {
    if (err) {
      console.error(err);
    } else {
      res.json(val);
    }
  });
});

export default router;
