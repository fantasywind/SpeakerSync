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
        id: '24t029uga',
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
        }, {
          source: 'youtube',
          value: 'SygkJv51Ixs',
          title: '陳綺貞 - 流浪者之歌 (Official Music Video)',
        }, {
          source: 'youtube',
          value: 'sFYpyKRcHoQ',
          title: '陳綺貞 - 天天想你 字幕',
        }],
      }, {
        id: 'weg2g2313g',
        name: 'Untitle Playlist 2',
        createdAt: new Date(),
        songs: [{
          source: 'youtube',
          value: 'xE6bNW2PmKw',
          title: 'Roar - Katy Perry cover by Jannine Weigel',
        }, {
          source: 'youtube',
          value: 'VaHgEZcFv-Y',
          title: '陳綺貞 - 旅行的意義 HD',
        }],
      }]);
    }
  }
});

export default db;
