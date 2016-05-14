import React, {
  PropTypes as T,
  Component,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import radium from 'radium';
import { EventEmitter } from 'events';

import * as PlaylistActions from '../../actions/Playlist.js';

const STATE_UNSTARTED = -1;

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
      this.initYoutubeDataSource();
    } else {
      YT.ready(() => {
        this.initYoutubePlayer();
        this.initYoutubeDataSource();
      });
    }
  }

  onYoutubePlayerReady() {
    this.props.setPlayer(this.player);
  }

  onYoutubeDataSourceReady() {
    this.props.setDataSource(this.dataSource);
  }

  fixYoutubePlayerEventListener(player) {
    const delegateController = new EventEmitter;

    // onStateChange
    function onStateChange(...args) {
      delegateController.emit('onStateChange', ...args);
    }

    player.addEventListener('onStateChange', onStateChange);

    // onStateChange
    function onError(...args) {
      delegateController.emit('onError', ...args);
    }

    player.addEventListener('onError', onError);

    player.addEventListener = (name, fn) => {
      delegateController.on(name, fn);
    };

    player.removeEventListener = (name, fn) => {
      delegateController.removeListener(name, fn);
    };
  }

  initYoutubeDataSource() {
    this.dataSource = new YT.Player(this.refs.dataSource, {
      height: 1,
      width: 1,
      events: {
        onReady: this.onYoutubeDataSourceReady.bind(this),
      },
    });

    this.fixYoutubePlayerEventListener(this.dataSource);
  }

  initYoutubePlayer() {
    this.player = new YT.Player(this.refs.container, {
      height: 1,
      width: 1,
      events: {
        onReady: this.onYoutubePlayerReady.bind(this),
      },
    });

    this.fixYoutubePlayerEventListener(this.player);

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

        case YT.PlayerState.ENDED:
          console.log('state ended');
          break;

        case YT.PlayerState.PLAYING:
          console.log('state playing');
          break;

        case YT.PlayerState.PAUSED:
          console.log('state paused');
          break;

        case YT.PlayerState.BUFFERING:
          console.log('state buffering');
          break;

        case YT.PlayerState.CUED:
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
        <div ref="dataSource"></div>
      </div>
    );
  }
}

YouTubePlayer.propTypes = {
  setPlayer: T.func,
  setDataSource: T.func,
  playingIndex: T.number,
  updatePlayingIndex: T.func,
};

export default connect(
  (state) => ({
    playingIndex: state.Playlist.playingIndex,
  }),
  (dispatch) => bindActionCreators(PlaylistActions, dispatch)
)(radium(YouTubePlayer));
