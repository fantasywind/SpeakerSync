import { push } from 'react-router-redux';

export const LOCAL_PLAYLIST_FETCHED = Symbol('LOCAL_PLAYLIST_FETCHED');
export const PLAY_LIST = Symbol('PLAY_LIST');
export const PLAYER_SET = Symbol('PLAYER_SET');
export const DATA_SOURCE_SET = Symbol('DATA_SOURCE_SET');
export const PLAYER_PLAY = Symbol('PLAYER_PLAY');
export const PLAYER_PAUSE = Symbol('PLAYER_PAUSE');
export const PLAYER_INDEX_UPDATE = Symbol('PLAYER_INDEX_UPDATE');
export const LAN_PLAYLIST_FOUND = Symbol('LAN_PLAYLIST_FOUND');
export const TIME_CURSOR_UPDATED = Symbol('TIME_CURSOR_UPDATED');
export const RESET_TIME_CURSOR = Symbol('RESET_TIME_CURSOR');
export const ADD_YOUTUBE_TO_PLAYLIST = Symbol('ADD_YOUTUBE_TO_PLAYLIST');
export const UPDATE_YOUTUBE_PREVIEW = Symbol('UPDATE_YOUTUBE_PREVIEW');
export const CLEAR_YOUTUBE_PREVIEW = Symbol('CLEAR_YOUTUBE_PREVIEW');
export const PLAYLIST_RENAMED = Symbol('PLAYLIST_RENAMED');

export function renamePlaylist(playlist, newName) {
  return async (dispatch) => {
    if (playlist.service) {
      try {
        const service = playlist.service;

        await fetch(`http://${service.addresses[0]}:${service.port}/playlists/${playlist.id}/name`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newName,
          })
        });

        dispatch({
          type: PLAYLIST_RENAMED,
          playlist,
          newName,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await fetch(`${SERVICE_HOST}/playlists/${playlist.id}/name`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newName,
          })
        });

        dispatch({
          type: PLAYLIST_RENAMED,
          playlist,
          newName,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };
}

export function addYoutubeSongToPlaylist(playlist, song) {
  return async (dispatch) => {
    if (playlist.service) {
      try {
        const service = playlist.service;

        await fetch(`http://${service.addresses[0]}:${service.port}/playlists/${playlist.id}/songs`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            songs: [
              ...playlist.songs,
              song,
            ],
          })
        });

        dispatch({
          type: ADD_YOUTUBE_TO_PLAYLIST,
          playlist,
          song,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await fetch(`${SERVICE_HOST}/playlists/${playlist.id}/songs`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            songs: [
              ...playlist.songs,
              song,
            ],
          })
        });

        dispatch({
          type: ADD_YOUTUBE_TO_PLAYLIST,
          playlist,
          song,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };
}

export function clearYoutubeDataPreview() {
  return {
    type: CLEAR_YOUTUBE_PREVIEW,
  };
}

export function updateYoutubeDataPreview(videoId, title = '', author = '') {
  return {
    type: UPDATE_YOUTUBE_PREVIEW,
    videoId,
    title,
    author,
  };
}

export function updateTimeCursor(now, total) {
  return {
    type: TIME_CURSOR_UPDATED,
    now,
    total,
  };
}

export function resetTimeCursor() {
  return {
    type: RESET_TIME_CURSOR,
  };
}

export function foundLanPlaylists(service) {
  return async (dispatch) => {
    let response = await fetch(`http://${service.addresses[0]}:${service.port}/playlists`);

    response = await response.json();

    dispatch({
      type: LAN_PLAYLIST_FOUND,
      playlists: response,
      service,
    });
  };
}

export function updatePlayingIndex(songIndex) {
  return {
    type: PLAYER_INDEX_UPDATE,
    songIndex,
  };
}

export function play(songIndex) {
  return {
    type: PLAYER_PLAY,
    songIndex,
  };
}

export function pause() {
  return {
    type: PLAYER_PAUSE,
  };
}

export function setDataSource(dataSource) {
  return {
    type: DATA_SOURCE_SET,
    dataSource,
  };
}

export function setPlayer(player) {
  return {
    type: PLAYER_SET,
    player,
  };
}

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
