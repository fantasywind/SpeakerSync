import React, {
  Component,
  PropTypes as T,
} from 'react';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlaylistItem from '../../components/Playlist/PlaylistItem.js';

import * as PlaylistActions from '../../actions/Playlist.js';

const styles = {
  wrapper: {

  },
};

class PlaylistList extends Component {
  componentDidMount() {
    const {
      foundLanPlaylists,
    } = this.props;

    this.socket = window.socket;

    this.bindedHostFound = foundLanPlaylists.bind(this);
    this.socket.on('hostFound', this.bindedHostFound);

    this.intervalToken = setInterval(() => this.socket.emit('scan'), 3000);
    this.props.fetchLocal();
  }

  componentWillUnmount() {
    clearInterval(this.intervalToken);
    this.socket.off('hostFound', this.bindedHostFound);
  }

  render() {
    const {
      localLists,
      playList,
      lanPlaylists,
    } = this.props;

    const listItems = localLists.map((playlist, index) => {
      const playBinded = playList.bind(null, playlist);
      return <PlaylistItem key={index} play={playBinded} playlist={playlist} />;
    });

    const lanListItems = lanPlaylists.map((playlist, index) => {
      const playBinded = playList.bind(null, playlist);
      return (
        <PlaylistItem
          key={index}
          {...playlist.service}
          play={playBinded}
          playlist={playlist} />
      );
    });

    return (
      <div style={styles.wrapper}>
        {listItems}
        {lanListItems}
      </div>
    );
  }
}

PlaylistList.propTypes = {
  fetchLocal: T.func,
  playList: T.func,
  foundLanPlaylists: T.func,
  localLists: T.array,
  lanPlaylists: T.array,
};

export default connect(
  (state) => ({
    lanPlaylists: state.Playlist.lanPlaylists,
    localLists: state.Playlist.localLists,
  }),
  (dispatch) => bindActionCreators(PlaylistActions, dispatch)
)(radium(PlaylistList));
