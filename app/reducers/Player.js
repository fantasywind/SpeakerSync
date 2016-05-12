import {
  PLAYER_SET,
  PLAYER_PLAY,
  PLAYER_PAUSE,
} from '../actions/Player.js';

import {
  LOCAL_PLAYLIST_FETCHED,
} from '../actions/Playlist.js';

export default (state = {
  playerInstance: null,
  isPlaying: false,
  playingSong: null,
}, action) => {
  let videoData;

  switch (action.type) {
    case LOCAL_PLAYLIST_FETCHED:
      if (state.playingSong) {
        return state;
      }

      if (action.playlists.length && action.playlists[0].songs.length) {
        return Object.assign({}, state, {
          playingSong: action.playlists[0].songs[0],
        });
      }

      return state;

    case PLAYER_SET:
      return Object.assign({}, state, {
        playerInstance: action.player,
        isPlaying: false,
      });

    case PLAYER_PLAY:
      if (!state.playerInstance) {
        return state;
      }

      // Play new song
      if (state.playingSong !== action.song) {
        state.playerInstance.loadVideoById({
          videoId: action.song.value,
        });

        state.playerInstance.playVideo();

        return Object.assign({}, state, {
          isPlaying: true,
          playingSong: action.song,
        });
      }

      // Play Staging Song
      videoData = state.playerInstance.getVideoData();

      if (!videoData.video_id) {
        state.playerInstance.loadVideoById({
          videoId: action.song.value,
        });
      }

      state.playerInstance.playVideo();

      return Object.assign({}, state, {
        isPlaying: true,
      });

    case PLAYER_PAUSE:
      if (!state.playerInstance) {
        return state;
      }

      state.playerInstance.pauseVideo();

      return Object.assign({}, state, {
        isPlaying: false,
      });

    default:
      return state;
  }
};
