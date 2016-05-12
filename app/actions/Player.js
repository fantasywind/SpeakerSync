export const PLAYER_SET = Symbol('PLAYER_SET');
export const PLAYER_PLAY = Symbol('PLAYER_PLAY');
export const PLAYER_PAUSE = Symbol('PLAYER_PAUSE');

export function setPlayer(player) {
  return {
    type: PLAYER_SET,
    player,
  };
}

export function play(song) {
  return {
    type: PLAYER_PLAY,
    song,
  };
}

export function pause() {
  return {
    type: PLAYER_PAUSE,
  };
}
