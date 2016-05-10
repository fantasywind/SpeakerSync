import React, {
  PropTypes as T,
} from 'react';
import radium from 'radium';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 18px',
  },
  button: {
    border: 0,
    backgroundColor: 'transparent',
    color: '#FFF',
    opacity: 0.72,
    fontSize: 16,
    height: 16,
    cursor: 'pointer',
    outline: 'none',
    ':hover': {
      opacity: 1,
    },
  },
  sm: {
    fontSize: 12,
    height: 12,
  },
};

function PlayerController(props) {
  const {
    isPlaying,
    play,
    pause,
  } = props;

  const onClick = isPlaying ? pause : play;

  return (
    <div style={styles.wrapper}>
      <button type="button" key="back" style={[styles.button, styles.sm]}>
        <span style={[styles.icon]} className="fa fa-fast-backward" />
      </button>
      <button type="button" key="state-control" onClick={onClick} style={[styles.button]}>
        {isPlaying ? (
          <span style={[styles.icon]} className="fa fa-pause" />
        ) : (
          <span style={[styles.icon]} className="fa fa-play" />
        )}
      </button>
      <button type="button" key="next" style={[styles.button, styles.sm]}>
        <span style={[styles.icon]} className="fa fa-fast-forward" />
      </button>
    </div>
  );
}

PlayerController.propTypes = {
  isPlaying: T.bool,
  play: T.func,
  pause: T.func,
};

export default radium(PlayerController);
