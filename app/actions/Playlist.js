export const LOCAL_PLAYLIST_FETCHED = Symbol('LOCAL_PLAYLIST_FETCHED');
export const PLAY_SONG = Symbol('PLAY_SONG');

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

export function playSong(song) {
  return {
    type: PLAY_SONG,
    song,
  };
}
