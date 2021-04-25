import { shuffle, startListByIndex } from "../../utils/playerUtils";
import * as PlayerTypes from "./player-types";

export const PlayerInitialState = {
  isShuffle: false,
  queue: [
    {
      _id: 1,
      title: "It'll Be Okay",
      url:
        "https://res.cloudinary.com/namelessfy/video/upload/v1619133568/tracks/SMLE%20ft.%20Helen%20Tess%20-%20Itll%20Be%20Okay.mp3.mp3",
      thumbnail:
        "https://i1.sndcdn.com/artworks-000124615826-4xsijx-t500x500.jpg",
      duration: 191,
      rating: 9.1,
      genre: "Chill House",
      authorId: "",
      artistId: [
        { _id: 1, userName: "SMLE" },
        { _id: 2, userName: "Helen Tess" },
      ],
      likedBy: [
        { userName: "janpc" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
      ],
    },
    {
      _id: 2,
      title: "Snow shovels",
      url:
        "https://res.cloudinary.com/namelessfy/video/upload/v1619133464/tracks/Droeloe%20-%20Snow%20shovels.mp3.mp3",
      thumbnail: "https://m.media-amazon.com/images/I/61F+HUu67vL._SS500_.jpg",
      duration: 191,
      rating: 9.1,
      genre: "Chill House",
      authorId: "",
      artistId: [{ _id: 3, userName: "Droeloe" }],
      likedBy: [
        { userName: "janpc" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
      ],
    },
    {
      _id: 3,
      title: "Invincible",
      url:
        "https://res.cloudinary.com/namelessfy/video/upload/v1619133405/tracks/Invincible.mp3.mp3",
      thumbnail: "https://m.media-amazon.com/images/I/81Lo2v82unL._SS500_.jpg",
      duration: 191,
      rating: 9.1,
      genre: "Chill House",
      authorId: "",
      artistId: [{ _id: 4, userName: "Don Diablo" }],
      likedBy: [
        { userName: "janpc" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
      ],
    },
    {
      _id: 5,
      title: "It'll Be Okay",
      url:
        "https://res.cloudinary.com/namelessfy/video/upload/v1619133568/tracks/SMLE%20ft.%20Helen%20Tess%20-%20Itll%20Be%20Okay.mp3.mp3",
      thumbnail:
        "https://i1.sndcdn.com/artworks-000124615826-4xsijx-t500x500.jpg",
      duration: 191,
      rating: 9.1,
      genre: "Chill House",
      authorId: "",
      artistId: [
        { _id: 1, userName: "SMLE" },
        { _id: 2, userName: "Helen Tess" },
      ],
      likedBy: [
        { userName: "janpc" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
      ],
    },
    {
      _id: 6,
      title: "Snow shovels",
      url:
        "https://res.cloudinary.com/namelessfy/video/upload/v1619133464/tracks/Droeloe%20-%20Snow%20shovels.mp3.mp3",
      thumbnail: "https://m.media-amazon.com/images/I/61F+HUu67vL._SS500_.jpg",
      duration: 191,
      rating: 9.1,
      genre: "Chill House",
      authorId: "",
      artistId: [{ _id: 3, userName: "Droeloe" }],
      likedBy: [
        { userName: "janpc" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
      ],
    },
    {
      _id: 7,
      title: "Invincible",
      url:
        "https://res.cloudinary.com/namelessfy/video/upload/v1619133405/tracks/Invincible.mp3.mp3",
      thumbnail: "https://m.media-amazon.com/images/I/81Lo2v82unL._SS500_.jpg",
      duration: 191,
      rating: 9.1,
      genre: "Chill House",
      authorId: "",
      artistId: [{ _id: 4, userName: "Don Diablo" }],
      likedBy: [
        { userName: "janpc" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
        { userName: "Zwette" },
        { userName: "Tom Rosenthal" },
      ],
    },
  ],
  shuffleQueue: [],
  preQueue: [],
  currentSong: {
    _id: 4,
    title: "Go Solo",
    url:
      "https://res.cloudinary.com/namelessfy/video/upload/v1619166394/tracks/Zwette_feat._Tom_Rosenthal_-_Go_Solo_Official_Lyric_Video_nomw0h.mp3",
    thumbnail:
      "https://res.cloudinary.com/namelessfy/image/upload/v1619002680/thumbnail/81IROWku2ML._SS500__un7y47.jpg",
    duration: 191,
    rating: 9.1,
    genre: "Chill House",
    authorId: "",
    artistId: [
      { _id: 5, userName: "Zwette" },
      { _id: 6, userName: "Tom Rosenthal" },
    ],
    likedBy: [
      { userName: "janpc" },
      { userName: "Tom Rosenthal" },
      { userName: "Zwette" },
      { userName: "Tom Rosenthal" },
      { userName: "Zwette" },
      { userName: "Tom Rosenthal" },
      { userName: "Zwette" },
      { userName: "Tom Rosenthal" },
    ],
  },
};

const PlayerReducer = (state = PlayerInitialState, action) => {
  switch (action.type) {
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

        list.push(state.currentSong);

        return {
          ...state,
          currentSong: song,
          queue: list,
          preQueue: preQ,
        };
      }

      if (state.isShuffle) {
        const list = [...state.shuffleQueue];
        const song = list.shift();

        list.push(state.currentSong);

        return {
          ...state,
          currentSong: song,
          shuffleQueue: list,
        };
      }

      const list = [...state.queue];
      const song = list.shift();

      list.push(state.currentSong);

      return {
        ...state,
        currentSong: song,
        queue: list,
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
        preQueue: action.payload,
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
