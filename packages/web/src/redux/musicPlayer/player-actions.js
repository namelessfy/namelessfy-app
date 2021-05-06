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

export const setPreQueue = (song) => ({
  type: PlayerTypes.SET_PREQUEUE,
  payload: song,
})

export const setQueueAndCurrentSong = (song, queue) => ({
  type: PlayerTypes.SET_QUEUE_AND_CURRENT_SONG,
  payload: {
    song: song,
    queue: queue,
  },
});
