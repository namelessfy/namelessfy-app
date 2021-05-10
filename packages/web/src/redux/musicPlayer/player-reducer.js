import { shuffle, startListByIndex } from "../../utils/playerUtils";
import { deleteAllInstancesFromList } from "../../utils/utils";
import * as PlayerTypes from "./player-types";

export const PlayerInitialState = {
  autoPlay: false,
  isShuffle: false,
  queue: [],
  shuffleQueue: [],
  preQueue: [],
  currentSong: null,
  isPrequeue: false,
  currentPlaylist: null,
  isCurrentSongDeleted: false,
};

const PlayerReducer = (state = PlayerInitialState, action) => {
  switch (action.type) {
    case PlayerTypes.SET_AUTOPLAY: {
      return {
        ...state,
        autoPlay: action.payload,
      };
    }
    case PlayerTypes.SET_CURRENT_SONG: {
      return {
        ...state,
        currentSong: action.payload,
      };
    }
    case PlayerTypes.NEXT_SONG: {
      if (state.preQueue.length > 0) {
        const preQ = [...state.preQueue];
        const list = [...state.queue];
        const song = preQ.shift();

        if (!state.isPrequeue && !state.isCurrentSongDeleted) {
          list.push(state.currentSong);
        }

        return {
          ...state,
          currentSong: song,
          queue: list,
          preQueue: preQ,
          isPrequeue: true,
          isCurrentSongDeleted: false,
        };
      }

      if (state.isShuffle) {
        const list = [...state.shuffleQueue];
        const song = list.shift();

        if (!state.isPrequeue && !state.isCurrentSongDeleted) {
          list.push(state.currentSong);
        }

        return {
          ...state,
          currentSong: song,
          shuffleQueue: list,
          isPrequeue: false,
          isCurrentSongDeleted: false,
        };
      }

      const list = [...state.queue];
      const song = list.shift();

      if (!state.isPrequeue && !state.isCurrentSongDeleted) {
        list.push(state.currentSong);
      }

      return {
        ...state,
        currentSong: song,
        queue: list,
        isPrequeue: false,
        isCurrentSongDeleted: false,
      };
    }

    case PlayerTypes.PREVIOUS_SONG: {
      if (state.isShuffle) {
        const list = state.isCurrentSongDeleted
          ? state.shuffleQueue
          : [state.currentSong, ...state.shuffleQueue];
        const song = list.pop();

        return {
          ...state,
          currentSong: song,
          shuffleQueue: list,
          isCurrentSongDeleted: false,
        };
      }

      const list = state.isCurrentSongDeleted
        ? state.queue
        : [state.currentSong, ...state.queue];
      const song = list.pop();
      return {
        ...state,
        currentSong: song,
        queue: list,
        isCurrentSongDeleted: false,
      };
    }
    case PlayerTypes.SET_SHUFFLE: {
      if (!state.isShuffle) {
        const queueShuffled = shuffle([...state.queue]);

        return {
          ...state,
          queue: [...state.queue, state.currentSong],
          shuffleQueue: queueShuffled,
          isShuffle: true,
        };
      }

      const queue = [...state.queue];
      const index = queue.findIndex(function isCurentSong(song) {
        if (song._id === state.currentSong._id) {
          return true;
        }
        return false;
      });

      const newQueue = startListByIndex(index, queue);

      return {
        ...state,
        isShuffle: false,
        queue: newQueue,
      };
    }

    case PlayerTypes.ADD_SONG_TO_PREQUEUE: {
      if (!state.currentSong) {
        return {
          ...state,
          currentSong: action.payload,
          autoPlay: true,
        };
      }
      return {
        ...state,
        preQueue: [...state.preQueue, action.payload],
      };
    }
    case PlayerTypes.SET_QUEUE: {
      if (state.isShuffle) {
        return {
          ...state,
          shuffleQueue: action.payload,
        };
      }
      return {
        ...state,
        queue: action.payload,
      };
    }

    case PlayerTypes.SET_PREQUEUE: {
      return {
        ...state,
        preQueue: action.payload,
      };
    }

    case PlayerTypes.SET_QUEUE_AND_CURRENT_SONG: {
      if (state.isShuffle) {
        const queueShuffled = shuffle([...action.payload.queue]);
        return {
          ...state,
          queue: action.payload.queue,
          shuffleQueue: queueShuffled,
          currentSong: action.payload.song,
          currentPlaylist: action.payload.playlist,
        };
      }
      return {
        ...state,
        queue: action.payload.queue,
        currentSong: action.payload.song,
        currentPlaylist: action.payload.playlist,
      };
    }

    case PlayerTypes.DELETE_SONG_FROM_QUEUE: {
      return {
        ...state,
        queue: deleteAllInstancesFromList(action.payload, state.queue),
        preQueue: deleteAllInstancesFromList(action.payload, state.preQueue),
        isCurrentSongDeleted: action.payload._id === state.currentSong._id,
      };
    }

    case PlayerTypes.IS_CURRENT_SONG_DELETED_RESET: {
      return {
        ...state,
        isCurrentSongDeleted: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default PlayerReducer;
