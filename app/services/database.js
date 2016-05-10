import levelup from 'levelup';
import path from 'path';

const db = levelup(path.resolve(__dirname, '../database/db.level'), {
  valueEncoding: 'json',
});

// Set Initial Values
db.get('PLAYLISTS', (err) => {
  if (err) {
    if (err.name === 'NotFoundError') {
      db.put('PLAYLISTS', [{
        name: 'Untitled Playlist',
        createdAt: new Date(),
        songs: [{
          source: 'youtube',
          value: 'bCT9h3K07-Y',
          title: '【MV韓繁中字】太妍(金泰妍/TAEYEON/태연) - Rain',
        }, {
          source: 'youtube',
          value: '4OrCA1OInoo',
          title: 'TAEYEON 태연_ I (feat. Verbal Jint)_Music Video',
        }],
      }]);
    }
  }
});

export default db;
