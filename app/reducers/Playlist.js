import {
  LOCAL_PLAYLIST_FETCHED,
} from '../actions/Playlist.js';

export default (state = {
  localLists: [],
  activedList: null,
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

      return Object.assign({}, state, replaceObject);

    default:
      return state;
  }
};
