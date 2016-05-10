import React from 'react';

import AppHeader from './AppHeader.js';
import PlayerBox from './Player/PlayerBox.js';

const styles = {
  wrapper: {
    padding: 0,
    margin: 0,
    color: '#FFF',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#17171A',
  },
};

export default function Dashboard() {
  return (
    <div style={styles.wrapper}>
      <AppHeader />
      <PlayerBox />
    </div>
  );
}
