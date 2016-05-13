import {
  LOCAL_PLAYLIST_FETCHED,
  PLAY_LIST,
  PLAYER_SET,
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_INDEX_UPDATE,
  LAN_PLAYLIST_FOUND,
  RESET_TIME_CURSOR,
  TIME_CURSOR_UPDATED,
} from '../actions/Playlist.js';

export default (state = {
  localLists: [],
  activedList: null,
  playerInstance: null,
  isPlaying: false,
  playingIndex: 0,
  lanPlaylists: [],
  timeCursorTotal: -1,
  timeCursorNow: 0,
}, action) => {
  let tmpState;

  switch (action.type) {
    case RESET_TIME_CURSOR:
      return Object.assign({}, state, {
        timeCursorTotal: -1,
        timeCursorNow: 0,
      });

    case TIME_CURSOR_UPDATED:
      return Object.assign({}, state, {
        timeCursorNow: action.now,
        timeCursorTotal: action.total,
      });

    case LAN_PLAYLIST_FOUND:
      tmpState = Object.assign({}, state);

      action.playlists.forEach((playlist) => {
        const isExisted = !!state.lanPlaylists.find((storedPlaylist) => {
          const sameId = storedPlaylist.id === playlist.id;
          const sameHost = storedPlaylist.service.host === action.service.host;
          const samePort = storedPlaylist.service.port === action.service.port;

          return sameId && sameHost && samePort;
        });

        if (!isExisted) {
          tmpState = Object.assign(tmpState, {
            lanPlaylists: [
              ...tmpState.lanPlaylists,
              Object.assign({}, playlist, {
                service: action.service,
              }),
            ],
          });
        }
      });

      return Object.assign({}, state, tmpState);

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
