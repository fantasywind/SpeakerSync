import React from 'react';
import NextOnePreview from '../../containers/NextOnePreview.js';

const styles = {
  wrapper: {
    padding: '6px 18px',
    backgroundColor: 'rgba(0, 0, 0, .42)',
    flex: 1,
  },
  helper: {
    fontSize: 12,
    margin: 0,
    letterSpacing: 2,
    color: '#D7D7D7',
  },
};

function NextOne() {
  return (
    <div style={styles.wrapper}>
      <p style={styles.helper}>接著播放:</p>
      <NextOnePreview />
    </div>
  );
}

NextOne.propTypes = {

};

export default NextOne;
