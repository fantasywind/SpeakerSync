import React, {
  PropTypes as T,
  Component,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import radium from 'radium';

import * as PlaylistActions from '../../actions/Playlist.js';

const styles = {
  wrapper: {
    position: 'absolute',
    width: 1,
    height: 1,
    top: -1,
    left: -1,
  },
};

class YouTubePlayer extends Component {
  componentDidMount() {
    if (YT.loaded) {
      this.initYoutubePlayer();
    } else {
      YT.ready(() => {
        this.initYoutubePlayer();
      });
    }
  }

  onYoutubePlayerReady() {
    this.props.setPlayer(this.player);
  }

  initYoutubePlayer() {
    this.player = new YT.Player(this.refs.container, {
      height: 1,
      width: 1,
      events: {
        onReady: this.onYoutubePlayerReady.bind(this),
      },
    });
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div ref="container"></div>
      </div>
    );
  }
}

YouTubePlayer.propTypes = {
  setPlayer: T.func,
};

export default connect(
  () => ({

  }),
  (dispatch) => bindActionCreators(PlaylistActions, dispatch)
)(radium(YouTubePlayer));
