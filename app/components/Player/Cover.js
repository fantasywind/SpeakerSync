import React, {
  Component,
  PropTypes as T,
} from 'react';
import radium from 'radium';

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
  smWrapper: {
    width: 54,
    height: 54,
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
      sm,
    } = this.props;

    if (!song) {
      return null;
    }

    return (
      <div style={[styles.wrapper, sm && styles.smWrapper]}>
        <img alt={song.name} style={styles.cover} src={this.getImageURL()} />
      </div>
    );
  }
}

Cover.propTypes = {
  song: T.object,
  sm: T.bool,
};

Cover.defaultProps = {
  sm: false,
};

export default radium(Cover);
