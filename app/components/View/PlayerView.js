import React from 'react';

import PlayerHeader from '../../containers/Headers/PlayerHeader.js';
import PlayerBox from '../Player/PlayerBox.js';
import NextOne from '../NextOne/NextOne.js';
import TimeCursorLine from '../../containers/TimeCursorLine.js';

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

export default function PlayerView() {
  return (
    <div style={styles.wrapper}>
      <PlayerHeader />
      <PlayerBox />
      <TimeCursorLine />
      <NextOne />
    </div>
  );
}
