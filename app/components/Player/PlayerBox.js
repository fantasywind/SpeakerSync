import React from 'react';

import PlayNow from '../../containers/PlayNow.js';

const styles = {
  wrapper: {
    padding: '6px 18px 2px 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function PlayerBox() {
  return (
    <div style={styles.wrapper}>
      <PlayNow />
    </div>
  );
}

export default PlayerBox;
