import React, {
  PropTypes as T,
} from 'react';
import { Link as link } from 'react-router';
import radium from 'radium';

const Link = radium(link);

const styles = {
  wrapper: {
    borderBottom: '1px solid #222',
    padding: '8px 14px',
    position: 'relative',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(9, 9, 10, .24)',
    },
  },
  title: {
    margin: 0,
    padding: 0,
    fontSize: 14,
    color: '#D2D2D2',
    fontWeight: 100,
  },
  icon: {
    marginRight: 12,
    color: '#797979',
  },
  toPlayBtn: {
    position: 'absolute',
    right: 0,
    top: 8,
  },
  link: {
    textDecoration: 'none',
  },
};

function PlaylistItem(props) {
  const {
    name,
  } = props.playlist;

  return (
    <Link to="/player" key="play-btn" style={styles.link}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>
          <span style={styles.icon} className="fa fa-music" />
          {name}
        </h2>
        <span style={[styles.icon, styles.toPlayBtn]} className="fa fa-play" />
      </div>
    </Link>
  );
}

PlaylistItem.propTypes = {
  playlist: T.object,
};

export default radium(PlaylistItem);
