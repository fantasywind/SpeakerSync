import React from 'react';
import { Link as link } from 'react-router';
import radium from 'radium';

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
    fontSize: 15,
    lineHeight: 1,
    color: '#FFF',
    fontWeight: 100,
    letterSpacing: 2,
    fontFamily: 'Helvetia Neue',
  },
  listButton: {
    right: 40,
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

function AppHeader() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>SpeakerSync</h1>
      <Link to="/playlists" key="list-btn" style={[styles.button, styles.listButton]}>
        <span className="fa fa-list-ul"></span>
      </Link>
      <Link to="/settings" key="setting-btn" style={styles.button}>
        <span className="fa fa-cog"></span>
      </Link>
    </header>
  );
}

export default radium(AppHeader);
