import React, {
  Component,
  PropTypes as T,
} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import radium from 'radium';

import * as PlayerActions from '../actions/Player.js';
import * as PlaylistActions from '../actions/Playlist.js';

import Cover from '../components/Player/Cover.js';
import SongMeta from '../components/Player/SongMeta.js';
import PlayerController from '../components/Player/PlayerController.js';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  player: {
    opacity: 0,
    position: 'absolute',
  },
  rightPart: {
    flex: 1,
  },
};

class PlayNow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
    };
  }

  componentDidMount() {
    const {
      nowSong,
      fetchLocal,
    } = this.props;

    if (!nowSong) {
      fetchLocal();
    }

    if (nowSong && nowSong.source === 'youtube') {
      this.initYoutubePlayer(nowSong);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.nowSong && nextProps.nowSong && nextProps.nowSong.source === 'youtube') {
      this.initYoutubePlayer(nextProps.nowSong);
    }
  }

  onYoutubePlayerReady() {
    this.props.setPlayer(this.player);
  }

  initYoutubePlayer(nowSong) {
    this.player = new YT.Player(this.refs.player, {
      height: 1,
      width: 1,
      videoId: nowSong.value,
      autoplay: true,
      events: {
        onReady: this.onYoutubePlayerReady.bind(this)
      }
    });
  }

  render() {
    const {
      title,
      nowSong,
      isPlaying,
      play,
      pause,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        <div style={styles.player} ref="player"></div>
        <Cover song={nowSong} />
        <div style={styles.rightPart}>
          <SongMeta title={title} />
          <PlayerController play={play} pause={pause} isPlaying={isPlaying} />
        </div>
      </div>
    );
  }
}

PlayNow.propTypes = {
  setPlayer: T.func,
  title: T.string,
  isPlaying: T.bool,
  fetchLocal: T.func,
  nowSong: T.object,
  play: T.func,
  pause: T.func,
};

export default connect(
  (state) => ({
    nowSong: state.Playlist.activedSong,
    isPlaying: state.Player.isPlaying,
    title: state.Player.title,
  }),
  (dispatch) => bindActionCreators(Object.assign({}, PlayerActions, PlaylistActions), dispatch)
)(radium(PlayNow));
