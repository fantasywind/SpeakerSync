import React from 'react';

import AppHeader from '../AppHeader.js';
import YoutubeFinderWrapper from '../YoutubeFinder/YoutubeFinderWrapper.js';

const styles = {
  wrapper: {
    padding: 0,
    margin: 0,
    color: '#FFF',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#17171A',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default function AddSongView() {
  return (
    <div style={styles.wrapper}>
      <AppHeader />
      <YoutubeFinderWrapper />
    </div>
  );
}
