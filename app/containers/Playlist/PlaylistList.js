import React, {
  Component,
  PropTypes as T,
} from 'react';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Playlist from '../../components/Playlist/PlaylistItem.js';

import * as PlaylistActions from '../../actions/Playlist.js';

const styles = {
  wrapper: {

  },
};

class PlaylistList extends Component {
  componentDidMount() {
    this.props.fetchLocal();
  }

  render() {
    const {
      localLists,
    } = this.props;

    const listItems = localLists.map((playlist) => <Playlist playlist={playlist} />);

    return (
      <div style={styles.wrapper}>
        {listItems}
      </div>
    );
  }
}

PlaylistList.propTypes = {
  fetchLocal: T.func,
  localLists: T.array,
};

export default connect(
  (state) => ({
    localLists: state.Playlist.localLists,
  }),
  (dispatch) => bindActionCreators(PlaylistActions, dispatch)
)(radium(PlaylistList));
