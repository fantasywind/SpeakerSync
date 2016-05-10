import React from 'react';
import radium from 'radium';

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
    fontFamily: 'sans-serif',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#E1E2E2',
    opacity: 0.72,
    border: 0,
    position: 'absolute',
    right: 8,
    top: 10,
    fontSize: 16,
    cursor: 'pointer',
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
      <button type="button" style={styles.button}>
        <span className="fa fa-cog"></span>
      </button>
    </header>
  );
}

export default radium(AppHeader);
