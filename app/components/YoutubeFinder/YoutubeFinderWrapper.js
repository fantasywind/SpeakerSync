import React from 'react';
import YoutubeFinder from '../../containers/YoutubeFinder/YoutubeFinder.js';

const styles = {
  wrapper: {
    flex: 1,
    position: 'relative',
    display: 'flex',
  },
  backgroundIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    fontSize: 96,
    margin: '-74px 0 0 -48px',
    color: '#777',
    opacity: 0.5,
  },
};

export default function YoutubeFinderWrapper() {
  return (
    <div style={styles.wrapper}>
      <span style={styles.backgroundIcon} className="fa fa-search"></span>
      <YoutubeFinder />
    </div>
  );
}
