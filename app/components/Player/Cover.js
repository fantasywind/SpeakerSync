import React, {
  Component,
  PropTypes as T,
} from 'react';

const styles = {
  wrapper: {
    width: 100,
    height: 100,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .12)',
  },
  cover: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
};

class Cover extends Component {
  getImageURL() {
    const {
      source,
      value,
    } = this.props.song;

    switch (source) {
      case 'youtube':
      default:
        return `http://img.youtube.com/vi/${value}/0.jpg`;
    }
  }

  render() {
    const {
      song,
    } = this.props;

    if (!song) {
      return null;
    }

    return (
      <div style={styles.wrapper}>
        <img alt={song.name} style={styles.cover} src={this.getImageURL()} />
      </div>
    );
  }
}

Cover.propTypes = {
  song: T.object,
};

export default Cover;
