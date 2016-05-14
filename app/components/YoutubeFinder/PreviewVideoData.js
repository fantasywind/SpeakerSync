import React, {
  PropTypes as T,
} from 'react';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    padding: '6px 20px 0 20px',
    width: '100%',
    height: 'auto',
    transition: 'height .24s ease-out',
  },
  minimize: {
    height: 0,
  },
  coverWrap: {
    width: 80,
    marginRight: 10,
  },
  cover: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  infoWrap: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: 300,
    margin: 0,
    height: 36,
    overflow: 'hidden',
    color: '#EFEFEF',
  },
  author: {
    margin: '12px 0 0 0',
    textAlign: 'right',
    fontSize: 10,
    fontWeight: 100,
    color: '#a7a7a7',
  },
};

function PreviewVideoData(props) {
  if (!Object.keys(props).length) {
    return (
      <div style={styles.minimize} key="wrapper">
      </div>
    );
  }

  return (
    <div style={styles.wrapper} key="wrapper">
      <div style={styles.coverWrap}>
        <img style={styles.cover} role="presentation" src={`http://img.youtube.com/vi/${props.videoId}/0.jpg`} />
      </div>
      <div style={styles.infoWrap}>
        <h3 style={styles.title}>{props.title}</h3>
        <p style={styles.author}>Uploaded by {props.author}</p>
      </div>
    </div>
  );
}

PreviewVideoData.propTypes = {
  title: T.string,
  author: T.string,
  videoId: T.string,
};

export default PreviewVideoData;
