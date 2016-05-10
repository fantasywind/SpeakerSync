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
    padding: '6px 0 0 0',
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
    } else if (this.props.nowSong !== nextProps.nowSong && nextProps.nowSong.source === 'youtube') {
      this.initYoutubePlayer(nextProps.nowSong);
    }
  }

  onYoutubePlayerReady() {
    this.props.setPlayer(this.player);
  }

  initYoutubePlayer(nowSong) {
    if (this.player) {
      this.player.loadVideoById(nowSong.value);
    } else {
      this.player = new YT.Player(this.refs.player, {
        height: 1,
        width: 1,
        videoId: nowSong.value,
        autoplay: true,
        events: {
          onReady: this.onYoutubePlayerReady.bind(this),
        },
      });
    }
  }

  playNextSong() {
    const {
      playlist,
      nowSong,
      playSong,
    } = this.props;

    if (playlist && playlist.songs) {
      const playingIndex = playlist.songs.findIndex((song) => song === nowSong);
      playSong(playlist.songs[playingIndex + 1] || playlist.songs[0]);
    }
  }

  playPrevSong() {
    const {
      playlist,
      nowSong,
      playSong,
    } = this.props;

    if (playlist && playlist.songs) {
      const playingIndex = playlist.songs.findIndex((song) => song === nowSong);
      playSong(playlist.songs[playingIndex - 1] || playlist.songs[playlist.songs.length - 1]);
    }
  }

  render() {
    const {
      nowSong,
      isPlaying,
      play,
      pause,
    } = this.props;

    const playPrevSong = this.playPrevSong.bind(this);
    const playNextSong = this.playNextSong.bind(this);

    return (
      <div style={styles.wrapper}>
        <div style={styles.player} ref="player"></div>
        {nowSong ? <Cover song={nowSong} /> : null}
        {nowSong ? (
          <div style={styles.rightPart}>
            <SongMeta title={nowSong.title} />
            <PlayerController
              prevSong={playPrevSong}
              nextSong={playNextSong}
              play={play}
              pause={pause}
              isPlaying={isPlaying} />
          </div>
        ) : null}
      </div>
    );
  }
}

PlayNow.propTypes = {
  setPlayer: T.func,
  isPlaying: T.bool,
  fetchLocal: T.func,
  nowSong: T.object,
  play: T.func,
  playlist: T.object,
  pause: T.func,
  playSong: T.func,
};

export default connect(
  (state) => ({
    playlist: state.Playlist.activedList,
    nowSong: state.Playlist.activedSong,
    isPlaying: state.Player.isPlaying,
  }),
  (dispatch) => bindActionCreators(Object.assign({}, PlayerActions, PlaylistActions), dispatch)
)(radium(PlayNow));
