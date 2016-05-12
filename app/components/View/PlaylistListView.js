import React, {
  Component,
} from 'react';

import AppHeader from '../AppHeader.js';
import PlaylistList from '../../containers/Playlist/PlaylistList.js';

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
  container: {
    padding: '8px 0',
  },
  title: {
    fontSize: 12,
    margin: 0,
    padding: '0 10px 8px 10px',
    color: '#D2D2D2',
    borderBottom: '1px solid #222',
  },
};

export default function PlaylistListView() {
  return (
    <div style={styles.wrapper}>
      <AppHeader />
      <div style={styles.container}>
        <h1 style={styles.title}>播放清單列表</h1>
        <PlaylistList />
      </div>
    </div>
  );
}
