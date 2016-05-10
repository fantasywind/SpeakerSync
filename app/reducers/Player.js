import {
  PLAYER_SET,
  PLAYER_PLAY,
  PLAYER_PAUSE,
} from '../actions/Player.js';

export default (state = {
  playerInstance: null,
  title: '',
  isPlaying: false,
}, action) => {
  let metadata;
  let replaceObject;

  switch (action.type) {
    case PLAYER_SET:
      metadata = action.player.getVideoData();

      return Object.assign({}, state, {
        playerInstance: action.player,
        title: metadata.title,
        isPlaying: false,
      });

    case PLAYER_PLAY:
      if (!state.playerInstance) {
        replaceObject = state;
      } else {
        state.playerInstance.playVideo();
        replaceObject = Object.assign({}, state, {
          isPlaying: true,
        });
      }

      return replaceObject;

    case PLAYER_PAUSE:
      if (!state.playerInstance) {
        replaceObject = state;
      } else {
        state.playerInstance.pauseVideo();
        replaceObject = Object.assign({}, state, {
          isPlaying: false,
        });
      }

      return replaceObject;

    default:
      return state;
  }
};