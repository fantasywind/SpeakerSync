import React, {
  Component,
  PropTypes as T,
} from 'react';
import radium from 'radium';
import { Link as link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlaylistActions from '../../actions/Playlist.js';

import PreviewVideoData from '../../components/YoutubeFinder/PreviewVideoData.js';

const Link = radium(link);

const styles = {
  wrapper: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'column',
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  buttonWrapper: {
    height: 50,
    width: '100%',
    padding: '10px 0',
    margin: '0 0 10px 0',
  },
  addButton: {
    display: 'block',
    textDecoration: 'none',
    width: '80%',
    backgroundColor: '#08c',
    color: '#FFF',
    textAlign: 'center',
    border: 0,
    borderRadius: 4,
    padding: '8px 0',
    margin: '0 10%',
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  activedBtn: {
    opacity: 1,
    cursor: 'pointer',
  },
  input: {
    fontSize: 14,
    borderRadius: 4,
    padding: '10px 8px',
    border: 0,
    width: '70%',
    margin: '16px 15% 0 15%',
    backgroundColor: 'rgba(220, 220, 220, .82)',
  },
};

const youtubeRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&\?]*).*/;

class YoutubeFinder extends Component {
  constructor(props) {
    super(props);

    this.bindedPlayerStateListener = this.playerStateListener.bind(this);
    this.bindedPlayerErrorHandler = this.playerErrorHandler.bind(this);
  }

  componentDidMount() {
    this.props.clearYoutubeDataPreview();
  }

  playerStateListener(state) {
    const {
      dataSourceInstance,
      updateYoutubeDataPreview,
    } = this.props;

    // Playing
    if (state.data === YT.PlayerState.PLAYING) {
      dataSourceInstance.removeEventListener('onStateChange', this.bindedPlayerStateListener);
      dataSourceInstance.removeEventListener('onError', this.bindedPlayerErrorHandler);
      dataSourceInstance.pauseVideo();

      const videoData = dataSourceInstance.getVideoData();

      updateYoutubeDataPreview(videoData.video_id, videoData.title, videoData.author);
    }
  }

  playerErrorHandler(error) {
    const {
      dataSourceInstance,
      clearYoutubeDataPreview,
    } = this.props;

    dataSourceInstance.removeEventListener('onStateChange', this.bindedPlayerStateListener);
    dataSourceInstance.removeEventListener('onError', this.bindedPlayerErrorHandler);

    if (error.data === 150 || error.data === 101) {
      alert('改影片不允許外連播放');
    } else {
      console.error(error);
    }

    clearYoutubeDataPreview();
    this.refs.input.value = '';
  }

  parseYoutube(e) {
    const {
      dataSourceInstance,
    } = this.props;

    if (e.target.value) {
      const match = e.target.value.match(youtubeRegex);
      const youtubeId = match && match[7];

      if (youtubeId) {
        dataSourceInstance.addEventListener('onStateChange', this.bindedPlayerStateListener);
        dataSourceInstance.addEventListener('onError', this.bindedPlayerErrorHandler);
        dataSourceInstance.loadVideoById({
          videoId: youtubeId,
        });
      }
    }
  }

  render() {
    const {
      previewVideoData,
      addYoutubeSongToPlaylist,
    } = this.props;

    const bindedParseYoutube = this.parseYoutube.bind(this);
    const buttonClick = previewVideoData ? addYoutubeSongToPlaylist.bind(null, {
      title: previewVideoData.title,
      source: 'youtube',
      value: previewVideoData.videoId,
    }) : null;

    return (
      <div style={styles.wrapper}>
        <div style={styles.inputWrapper}>
          <PreviewVideoData {...previewVideoData} />
          <input
            type="text"
            ref="input"
            onKeyUp={bindedParseYoutube}
            style={styles.input}
            placeholder="YouTube URL.." />
        </div>
        <div style={styles.buttonWrapper}>
          <Link
            onClick={buttonClick}
            to="/player"
            style={[styles.addButton, previewVideoData && styles.activedBtn]}
          >加入歌曲</Link>
        </div>
      </div>
    );
  }
}

YoutubeFinder.propTypes = {
  addYoutubeSongToPlaylist: T.func,
  updateYoutubeDataPreview: T.func,
  clearYoutubeDataPreview: T.func,
  dataSourceInstance: T.object,
  playlist: T.object,
  previewVideoData: T.object,
};

export default connect(
  (state) => ({
    previewVideoData: state.Playlist.previewVideoData,
    playlist: state.Playlist.activedList,
    dataSourceInstance: state.Playlist.dataSourceInstance,
  }),
  (dispatch) => bindActionCreators(PlaylistActions, dispatch)
)(radium(YoutubeFinder));
