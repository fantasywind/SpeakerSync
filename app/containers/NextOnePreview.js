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
    playingSong,
  } = props;

  if (!playlist || !playlist.songs || !playlist.songs.length) {
    return null;
  }

  const songIndex = playlist.songs.findIndex((song) => song === playingSong);
  let nextSong = playlist.songs[songIndex + 1];

  if (!nextSong) {
    nextSong = playlist.songs[0];
  }

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
  playingSong: T.object,
};

export default connect(
  (state) => ({
    playingSong: state.Player.playingSong,
    playlist: state.Playlist.activedList,
  })
)(radium(NextOnePreview));
