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
      playingSong,
      fetchLocal,
    } = this.props;

    if (!playingSong) {
      fetchLocal();
    }
  }

  playNextSong() {
    const {
      playlist,
      playingSong,
      play,
    } = this.props;

    if (playlist && playlist.songs) {
      const playingIndex = playlist.songs.findIndex((song) => song === playingSong);
      play(playlist.songs[playingIndex + 1] || playlist.songs[0]);
    }
  }

  playPrevSong() {
    const {
      playlist,
      playingSong,
      play,
    } = this.props;

    if (playlist && playlist.songs) {
      const playingIndex = playlist.songs.findIndex((song) => song === playingSong);
      play(playlist.songs[playingIndex - 1] || playlist.songs[playlist.songs.length - 1]);
    }
  }

  render() {
    const {
      playingSong,
      isPlaying,
      play,
      pause,
    } = this.props;

    const playPrevSong = this.playPrevSong.bind(this);
    const playNextSong = this.playNextSong.bind(this);
    const bindedPlay = play.bind(null, playingSong);

    return (
      <div style={styles.wrapper}>
        <div style={styles.player} ref="player"></div>
        {playingSong ? <Cover song={playingSong} /> : null}
        {playingSong ? (
          <div style={styles.rightPart}>
            <SongMeta title={playingSong.title} />
            <PlayerController
              prevSong={playPrevSong}
              nextSong={playNextSong}
              play={bindedPlay}
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
  playingSong: T.object,
  play: T.func,
  playlist: T.object,
  pause: T.func,
};

export default connect(
  (state) => ({
    playlist: state.Playlist.activedList,
    playingSong: state.Player.playingSong,
    isPlaying: state.Player.isPlaying,
  }),
  (dispatch) => bindActionCreators(Object.assign({}, PlayerActions, PlaylistActions), dispatch)
)(radium(PlayNow));
