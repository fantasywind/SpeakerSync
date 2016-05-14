import React, {
  PropTypes as T,
  Component,
} from 'react';
import { Link as link } from 'react-router';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PlaylistActions from '../../actions/Playlist.js';

const Link = radium(link);

const styles = {
  header: {
    backgroundColor: '#3D404A',
    height: 42,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 16px',
    position: 'relative',
  },
  title: {
    margin: '0 0 0 17px',
    fontSize: 15,
    lineHeight: 1,
    color: '#FFF',
    fontWeight: 100,
    letterSpacing: 2,
    fontFamily: 'Helvetia Neue',
    maxWidth: 190,
    maxHeight: 15,
    overflow: 'hidden',
  },
  listButton: {
    right: 40,
  },
  addButton: {
    right: 71,
  },
  button: {
    display: 'block',
    backgroundColor: 'transparent',
    color: '#E1E2E2',
    opacity: 0.72,
    border: 0,
    position: 'absolute',
    right: 13,
    top: 13,
    fontSize: 16,
    padding: 0,
    cursor: 'pointer',
    outline: 'none',
    ':hover': {
      opacity: 1,
      color: '#FFF',
    },
  },
  editButton: {
    right: 'auto',
    left: 13,
    top: 12,
    fontSize: 13,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, .24)',
    border: 'rgba(255, 255, 255, .6)',
    borderRadius: 2,
    fontSize: 15,
    color: '#FFF',
    margin: '0 0 0 18px',
    padding: '2px 6px 3px 6px',
  },
};

class PlayerHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlist !== this.props.playlist) {
      this.setState({
        isEditing: false,
      });
    }
  }

  edit() {
    this.setState({
      isEditing: true,
    });
  }

  submit() {
    const {
      input,
    } = this.refs;

    const {
      playlist,
      renamePlaylist,
    } = this.props;

    if (input.value) {
      renamePlaylist(playlist, input.value);
    } else {
      this.setState({
        isEditing: false,
      });
    }
  }

  render() {
    const {
      playlist,
    } = this.props;

    const {
      isEditing,
    } = this.state;

    const bindedSubmit = this.submit.bind(this);
    const bindedEdit = this.edit.bind(this);
    const addSongRoute = playlist ? `/playlists/${playlist.id}/addSong` : '/player';

    return (
      <header style={styles.header}>
        {isEditing ? (
          <button
            onClick={bindedSubmit}
            type="button"
            key="submit-btn"
            style={[styles.button, styles.editButton]}>
            <span className="fa fa-check"></span>
          </button>
        ) : (
          <button
            onClick={bindedEdit}
            type="button"
            key="edit-btn"
            style={[styles.button, styles.editButton]}>
            <span className="fa fa-pencil"></span>
          </button>
        )}
        {isEditing ? (
          <input
            ref="input"
            style={styles.input}
            type="text"
            placeholder="Playlist Name"
            defaultValue={playlist.name} />
        ) : (
          <h1 style={styles.title}>{playlist ? `${playlist.name}` : ''}</h1>
        )}
        <Link to={addSongRoute} key="add-btn" style={[styles.button, styles.addButton]}>
          <span className="fa fa-plus"></span>
        </Link>
        <Link to="/playlists" key="list-btn" style={[styles.button, styles.listButton]}>
          <span className="fa fa-list-ul"></span>
        </Link>
        <Link to="/settings" key="setting-btn" style={styles.button}>
          <span className="fa fa-cog"></span>
        </Link>
      </header>
    );
  }
}

PlayerHeader.propTypes = {
  playlist: T.object,
  renamePlaylist: T.func,
};

export default connect(
  (state) => ({
    playlist: state.Playlist.activedList,
  }),
  (dispatch) => bindActionCreators(PlaylistActions, dispatch)
)(radium(PlayerHeader));
