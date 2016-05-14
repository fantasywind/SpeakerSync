import React from 'react';
import NextOnePreview from '../../containers/NextOnePreview.js';

const styles = {
  wrapper: {
    padding: '10px 18px 6px 18px',
    backgroundColor: 'rgba(0, 0, 0, .42)',
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  helper: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    margin: 0,
    textDecoration: 'underline',
    color: '#a1a1a1',
  },
};

function NextOne() {
  return (
    <div style={styles.wrapper}>
      <p style={styles.helper}>Next on:</p>
      <NextOnePreview />
    </div>
  );
}

NextOne.propTypes = {

};

export default NextOne;
