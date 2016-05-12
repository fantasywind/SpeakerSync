import { push } from 'react-router-redux';

export const LOCAL_PLAYLIST_FETCHED = Symbol('LOCAL_PLAYLIST_FETCHED');
export const PLAY_LIST = Symbol('PLAY_LIST');

export function fetchLocal() {
  return async (dispatch) => {
    let response = await fetch(`${SERVICE_HOST}/playlists`);

    response = await response.json();

    dispatch({
      type: LOCAL_PLAYLIST_FETCHED,
      playlists: response,
    });
  };
}

export function playList(playlist, e) {
  e.preventDefault();

  return (dispatch) => {
    dispatch({
      type: PLAY_LIST,
      playlist,
    });

    dispatch(push('/player'));
  };
}
