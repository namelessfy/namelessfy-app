import * as PlayerTypes from "./player-types";

/*
  - next song
  - previous song
  - set current song
  - toggle shuffle

*/
export const setAutoPlay = (autoPlay) => ({
  type: PlayerTypes.SET_AUTOPLAY,
  payload: autoPlay,
});
export const setNextSong = () => ({
  type: PlayerTypes.NEXT_SONG,
});

export const setPreviousSong = () => ({
  type: PlayerTypes.PREVIOUS_SONG,
});

export const setShuffle = () => ({
  type: PlayerTypes.SET_SHUFFLE,
});

export const setQueue = (newQueue) => ({
  type: PlayerTypes.SET_QUEUE,
  payload: newQueue,
});

export const setPreQueue = (newQueue) => ({
  type: PlayerTypes.SET_PREQUEUE,
  payload: newQueue,
});

export const addSongToPreQueue = (song) => ({
  type: PlayerTypes.ADD_SONG_TO_PREQUEUE,
  payload: song,
});

export const setQueueAndCurrentSong = (song, queue, playlist) => ({
  type: PlayerTypes.SET_QUEUE_AND_CURRENT_SONG,
  payload: {
    song: song,
    queue: queue,
    playlist: playlist,
  },
});

export const deleteSongFromQueue = (song) => ({
  type: PlayerTypes.DELETE_SONG_FROM_QUEUE,
  payload: song,
});

export const resetCurrentSongDeleted = () => ({
  type: PlayerTypes.IS_CURRENT_SONG_DELETED_RESET,
});
