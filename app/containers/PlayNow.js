import React, {
  Component,
  PropTypes as T,
} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import radium from 'radium';

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
      playlist,
      fetchLocal,
    } = this.props;

    if (!playlist) {
      fetchLocal();
    }
  }

  playNextSong() {
    const {
      playlist,
      playingIndex,
      play,
    } = this.props;

    if (playlist && playlist.songs) {
      play(playlist.songs[playingIndex + 1] ? playingIndex + 1 : 0);
    }
  }

  playPrevSong() {
    const {
      playlist,
      playingIndex,
      play,
    } = this.props;

    if (playlist && playlist.songs) {
      play(playlist.songs[playingIndex - 1] ? playingIndex - 1 : playlist.songs.length - 1);
    }
  }

  render() {
    const {
      playlist,
      playingIndex,
      isPlaying,
      play,
      pause,
    } = this.props;

    const playPrevSong = this.playPrevSong.bind(this);
    const playNextSong = this.playNextSong.bind(this);
    const bindedPlay = play.bind(null, playingIndex);
    if (!playlist || !playlist.songs[playingIndex]) {
      return null;
    }

    const playingSong = playlist.songs[playingIndex];

    return (
      <div style={styles.wrapper}>
        <Cover song={playingSong} />
        <div style={styles.rightPart}>
          <SongMeta title={playingSong.title} />
          <PlayerController
            prevSong={playPrevSong}
            nextSong={playNextSong}
            play={bindedPlay}
            pause={pause}
            isPlaying={isPlaying} />
        </div>
      </div>
    );
  }
}

PlayNow.propTypes = {
  setPlayer: T.func,
  isPlaying: T.bool,
  fetchLocal: T.func,
  playingIndex: T.number,
  play: T.func,
  playlist: T.object,
  pause: T.func,
};

export default connect(
  (state) => ({
    playlist: state.Playlist.activedList,
    isPlaying: state.Playlist.isPlaying,
    playingIndex: state.Playlist.playingIndex,
  }),
  (dispatch) => bindActionCreators(Object.assign({}, PlaylistActions), dispatch)
)(radium(PlayNow));
