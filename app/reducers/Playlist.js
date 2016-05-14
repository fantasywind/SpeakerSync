import {
  LOCAL_PLAYLIST_FETCHED,
  PLAY_LIST,
  PLAYER_SET,
  DATA_SOURCE_SET,
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_INDEX_UPDATE,
  LAN_PLAYLIST_FOUND,
  RESET_TIME_CURSOR,
  TIME_CURSOR_UPDATED,
  ADD_YOUTUBE_TO_PLAYLIST,
  UPDATE_YOUTUBE_PREVIEW,
  CLEAR_YOUTUBE_PREVIEW,
} from '../actions/Playlist.js';

export default (state = {
  localLists: [],
  activedList: null,
  playerInstance: null,
  dataSourceInstance: null,
  isPlaying: false,
  playingIndex: 0,
  lanPlaylists: [],
  timeCursorTotal: -1,
  timeCursorNow: 0,
  previewVideoData: null,
}, action) => {
  let tmpState;
  let newSongList;
  let willUpdateListIdx;
  let playState;
  let pauseListener;

  switch (action.type) {
    case CLEAR_YOUTUBE_PREVIEW:
      return Object.assign({}, state, {
        previewVideoData: null,
      });

    case UPDATE_YOUTUBE_PREVIEW:
      return Object.assign({}, state, {
        previewVideoData: {
          videoId: action.videoId,
          title: action.title,
          author: action.author,
        },
      });

    case ADD_YOUTUBE_TO_PLAYLIST:
      newSongList = [
        ...state.activedList.songs,
        action.song,
      ];

      if (state.activedList === action.playlist) {
        playState = state.playerInstance.getPlayerState();
        state.playerInstance.loadPlaylist({
          playlist: newSongList.map((song) => song.value),
          index: state.playerInstance.getPlaylistIndex(),
          startSeconds: state.playerInstance.getCurrentTime(),
        });

        if (playState === YT.PlayerState.PAUSED || playState === YT.PlayerState.CUED) {
          pauseListener = (e) => {
            if (e.data === YT.PlayerState.PLAYING) {
              // Fixed Immediately Pause Fail
              state.playerInstance.mute();
              setTimeout(() => {
                state.playerInstance.pauseVideo();
                state.playerInstance.unMute();
              }, 10);
              state.playerInstance.removeEventListener('onStateChange', pauseListener);
            }
          };
          state.playerInstance.addEventListener('onStateChange', pauseListener);
        }

        tmpState = Object.assign({}, state, {
          activedList: Object.assign({}, state.activedList, {
            songs: newSongList,
          }),
        });
      }

      if (action.playlist.service) {
        // Lan Playlist
        willUpdateListIdx = state.lanPlaylists.findIndex((list) => list === action.playlist);

        if (!~willUpdateListIdx) {
          return state;
        }

        return Object.assign({}, state, tmpState, {
          lanPlaylists: [
            ...state.lanPlaylists.slice(0, willUpdateListIdx),
            Object.assign({}, state.lanPlaylists[willUpdateListIdx], {
              songs: newSongList,
            }),
            ...state.lanPlaylists.slice(willUpdateListIdx + 1),
          ]
        });
      }

      // Local Playlist
      willUpdateListIdx = state.localLists.findIndex((list) => list === action.playlist);

      if (!~willUpdateListIdx) {
        return state;
      }

      return Object.assign({}, state, tmpState, {
        localLists: [
          ...state.localLists.slice(0, willUpdateListIdx),
          Object.assign({}, state.localLists[willUpdateListIdx], {
            songs: newSongList,
          }),
          ...state.localLists.slice(willUpdateListIdx + 1),
        ]
      });

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

    case DATA_SOURCE_SET:
      return Object.assign({}, state, {
        dataSourceInstance: action.dataSource,
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
