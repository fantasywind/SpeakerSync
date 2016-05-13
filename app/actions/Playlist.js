import { push } from 'react-router-redux';

export const LOCAL_PLAYLIST_FETCHED = Symbol('LOCAL_PLAYLIST_FETCHED');
export const PLAY_LIST = Symbol('PLAY_LIST');
export const PLAYER_SET = Symbol('PLAYER_SET');
export const PLAYER_PLAY = Symbol('PLAYER_PLAY');
export const PLAYER_PAUSE = Symbol('PLAYER_PAUSE');
export const PLAYER_INDEX_UPDATE = Symbol('PLAYER_INDEX_UPDATE');
export const LAN_PLAYLIST_FOUND = Symbol('LAN_PLAYLIST_FOUND');
export const TIME_CURSOR_UPDATED = Symbol('TIME_CURSOR_UPDATED');
export const RESET_TIME_CURSOR = Symbol('RESET_TIME_CURSOR');

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
