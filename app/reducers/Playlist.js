import {
  LOCAL_PLAYLIST_FETCHED,
  PLAY_LIST,
  PLAYER_SET,
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_INDEX_UPDATE,
} from '../actions/Playlist.js';

export default (state = {
  localLists: [],
  activedList: null,
  playerInstance: null,
  isPlaying: false,
  playingIndex: 0,
}, action) => {
  switch (action.type) {
    case PLAYER_INDEX_UPDATE:
      return Object.assign({}, state, {
        playingIndex: action.songIndex,
      });

    case PLAYER_PAUSE:
      if (!state.playerInstance) {
        return state;
      }

      state.playerInstance.pauseVideo();

      return Object.assign({}, state, {
        isPlaying: false,
      });

    case PLAYER_PLAY:
      if (!state.playerInstance) {
        return state;
      }

      if (state.playingIndex === action.songIndex) {
        state.playerInstance.playVideo();

        return Object.assign({}, state, {
          isPlaying: true,
        });
      }

      state.playerInstance.playVideoAt(action.songIndex || 0);

      return Object.assign({}, state, {
        isPlaying: true,
        playingIndex: action.songIndex || 0,
      });

    case PLAYER_SET:
      if (state.activedList) {
        action.player.cuePlaylist({
          playlist: state.activedList.songs.map((song) => song.value),
        });
      }

      return Object.assign({}, state, {
        playerInstance: action.player,
        isPlaying: false,
      });

    case LOCAL_PLAYLIST_FETCHED:
      if (state.activedList) {
        return Object.assign({}, state, {
          localLists: action.playlists,
        });
      }

      return Object.assign({}, state, {
        localLists: action.playlists,
        activedList: action.playlists[0] || null,
      });

    case PLAY_LIST:
      state.playerInstance.loadPlaylist({
        playlist: action.playlist.songs.map((song) => song.value),
      });

      return Object.assign({}, state, {
        activedList: action.playlist,
        playingIndex: 0,
        isPlaying: true,
      });

    default:
      return state;
  }
};
