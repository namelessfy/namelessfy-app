import * as PlayerTypes from "./player-types";

/*
  - next song
  - previous song
  - set current song
  - toggle shuffle

*/
export const setNextSong = () => ({
  type: PlayerTypes.NEXT_SONG,
});

export const setPreviousSong = () => ({
  type: PlayerTypes.PREVIOUS_SONG,
});

export const setShuffle = () => ({
  type: PlayerTypes.SET_SHUFFLE,
});
