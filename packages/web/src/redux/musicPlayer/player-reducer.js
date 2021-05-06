import { shuffle, startListByIndex } from "../../utils/playerUtils";
import * as PlayerTypes from "./player-types";

export const PlayerInitialState = {
  autoPlay: false,
  isShuffle: false,
  queue: [],
  shuffleQueue: [],
  preQueue: [],
  currentSong: {},
  isPrequeue: false,
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

        if (!state.isPrequeue)
          {list.push(state.currentSong);}


        return {
          ...state,
          currentSong: song,
          queue: list,
          preQueue: preQ,
          isPrequeue: true,
        };
      }

      if (state.isShuffle) {
        const list = [...state.shuffleQueue];
        const song = list.shift();

        if (!state.isPrequeue)
          {list.push(state.currentSong);}

        return {
          ...state,
          currentSong: song,
          shuffleQueue: list,
          isPrequeue: false,
        };
      }

      const list = [...state.queue];
      const song = list.shift();

      if (!state.isPrequeue)
          {list.push(state.currentSong);}

      return {
        ...state,
        currentSong: song,
        queue: list,
        isPrequeue: false,
      };
    }

    case PlayerTypes.PREVIOUS_SONG: {
      if (state.isShuffle) {
        const list = [state.currentSong, ...state.shuffleQueue];
        const song = list.pop();

        return {
          ...state,
          currentSong: song,
          shuffleQueue: list,
        };
      }
      const list = [state.currentSong, ...state.queue];
      const song = list.pop();

      return {
        ...state,
        currentSong: song,
        queue: list,
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

    case PlayerTypes.SET_PREQUEUE: {
      return {
        ...state,
        preQueue: [ ...state.preQueue, action.payload]
      };
    }
    case PlayerTypes.SET_QUEUE: {
      return {
        ...state,
        queue: action.payload,
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
        };
      }
      return {
        ...state,
        queue: action.payload.queue,
        currentSong: action.payload.song,
      };
    }
    default: {
      return state;
    }
  }
};

export default PlayerReducer;
