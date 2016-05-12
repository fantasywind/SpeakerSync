import React, {
  PropTypes as T,
} from 'react';
import { connect } from 'react-redux';
import radium from 'radium';

import Cover from '../components/Player/Cover.js';

const styles = {
  wrapper: {
    padding: '2px 8px',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  helper: {
    fontSize: 12,
    margin: 0,
    letterSpacing: 2,
    color: '#D7D7D7',
  },
  metadata: {
    flex: 1,
    padding: '0 0 0 14px',
  },
  title: {
    fontSize: 12,
    color: '#A1A1A1',
  },
};

function NextOnePreview(props) {
  const {
    playlist,
    playingIndex,
  } = props;

  if (!playlist || !playlist.songs || !playlist.songs.length) {
    return null;
  }

  let nextSong = playlist.songs[playingIndex + 1] || playlist.songs[0];

  return (
    <div style={styles.wrapper}>
      <Cover sm song={nextSong} />
      <div style={styles.metadata}>
        <p style={styles.title}>{nextSong.title}</p>
      </div>
    </div>
  );
}

NextOnePreview.propTypes = {
  playlist: T.object,
  playingIndex: T.number,
};

export default connect(
  (state) => ({
    playingIndex: state.Playlist.playingIndex,
    playlist: state.Playlist.activedList,
  })
)(radium(NextOnePreview));
