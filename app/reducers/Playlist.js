import {
  LOCAL_PLAYLIST_FETCHED,
  PLAY_SONG,
} from '../actions/Playlist.js';

export default (state = {
  localLists: [],
  activedList: null,
  activedSong: null,
}, action) => {
  let replaceObject;

  switch (action.type) {
    case LOCAL_PLAYLIST_FETCHED:
      replaceObject = {
        localLists: action.playlists,
        activedList: action.playlists[0] || null,
      };

      if (state.activedList) {
        delete replaceObject.activedList;
      }

      if (replaceObject.activedList) {
        replaceObject.activedSong = replaceObject.activedList.songs[0] || null;
      }

      return Object.assign({}, state, replaceObject);

    case PLAY_SONG:
      return Object.assign({}, state, {
        activedSong: action.song,
      });

    default:
      return state;
  }
};
