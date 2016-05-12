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
  hostLabel: {
    display: 'block',
    backgroundColor: '#08c',
    padding: '2px 8px',
    borderRadius: 1,
    position: 'absolute',
    right: 32,
    top: 9,
    color: '#FFF',
    fontSize: 10,
    opacity: 0.72,
  },
};

function PlaylistItem(props) {
  const {
    name,
  } = props.playlist;

  return (
    <Link to="/player" key="play-btn" style={styles.link} onClick={props.play}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>
          <span style={styles.icon} className="fa fa-music" />
          {name}
        </h2>
        {props.host ? <span style={styles.hostLabel}>{props.host}</span> : null}
        <span style={[styles.icon, styles.toPlayBtn]} className="fa fa-play" />
      </div>
    </Link>
  );
}

PlaylistItem.propTypes = {
  playlist: T.object,
  play: T.func,
  host: T.string,
  port: T.number,
  addresses: T.array,
};

export default radium(PlaylistItem);
