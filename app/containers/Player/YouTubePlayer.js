import React, {
  PropTypes as T,
  Component,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import radium from 'radium';

import * as PlaylistActions from '../../actions/Playlist.js';

const STATE_UNSTARTED = -1;
const STATE_ENDED = 0;
const STATE_PLAYING = 1;
const STATE_PAUSED = 2;
const STATE_BUFFERING = 3;
const STATE_VIDEO_CUED = 5;

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

    this.player.addEventListener('onStateChange', (e) => {
      const {
        playingIndex,
        updatePlayingIndex,
      } = this.props;

      switch (e.data) {
        case STATE_UNSTARTED:
          if (this.player.getPlaylistIndex() !== playingIndex) {
            updatePlayingIndex(this.player.getPlaylistIndex());
          }
          break;

        case STATE_ENDED:
          console.log('state ended');
          break;

        case STATE_PLAYING:
          console.log('state playing');
          break;

        case STATE_PAUSED:
          console.log('state paused');
          break;

        case STATE_BUFFERING:
          console.log('state buffering');
          break;

        case STATE_VIDEO_CUED:
          console.log('state video cued');
          break;

        default:
          console.log('undefined state');
          break;
      }
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
  playingIndex: T.number,
  updatePlayingIndex: T.func,
};

export default connect(
  (state) => ({
    playingIndex: state.Playlist.playingIndex,
  }),
  (dispatch) => bindActionCreators(PlaylistActions, dispatch)
)(radium(YouTubePlayer));
