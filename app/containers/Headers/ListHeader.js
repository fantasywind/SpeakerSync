import React, {
  PropTypes as T,
} from 'react';
import { Link as link } from 'react-router';
import radium from 'radium';
import { connect } from 'react-redux';

const Link = radium(link);

const styles = {
  header: {
    backgroundColor: '#3D404A',
    height: 42,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 16px',
    position: 'relative',
  },
  title: {
    margin: 0,
    lineHeight: 1,
    color: '#FFF',
    fontWeight: 100,
    letterSpacing: 2,
    fontSize: 13,
    maxWidth: 270,
    maxHeight: 13,
    overflow: 'hidden',
    fontFamily: 'Helvetia Neue',
  },
  titleHasBack: {
    marginLeft: 20,
  },
  backButton: {
    left: 13,
  },
  button: {
    display: 'block',
    backgroundColor: 'transparent',
    color: '#E1E2E2',
    opacity: 0.72,
    border: 0,
    position: 'absolute',
    right: 13,
    top: 13,
    fontSize: 16,
    padding: 0,
    cursor: 'pointer',
    outline: 'none',
    ':hover': {
      opacity: 1,
      color: '#FFF',
    },
  },
};

function ListHeader(props) {
  const playingSong = props.isPlaying ? props.playlist.songs[props.playingIdx] : '';
  const titleText = props.isPlaying ? `播放中: ${playingSong.title}` : 'SpeakerSync';

  return (
    <header style={styles.header}>
      {props.isPlaying ? (
        <Link to="/player" key="list-btn" style={[styles.button, styles.backButton]}>
          <span className="fa fa-chevron-left"></span>
        </Link>
      ) : null}
      <h1 style={[styles.title, props.isPlaying && styles.titleHasBack]}>{titleText}</h1>
      <Link to="/settings" key="setting-btn" style={styles.button}>
        <span className="fa fa-cog"></span>
      </Link>
    </header>
  );
}

ListHeader.propTypes = {
  playingIdx: T.number,
  isPlaying: T.bool,
  playlist: T.object,
};

export default connect(
  (state) => ({
    playlist: state.Playlist.activedList,
    isPlaying: state.Playlist.isPlaying,
    playingIdx: state.Playlist.playingIndex,
  })
)(radium(ListHeader));
