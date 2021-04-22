import * as PlayerTypes from "./player-types";

export const PlayerInitialState = {
  isShuffle: false,
  queue: [
    {
      title: "Go Solo II",
      url:
        "https://res.cloudinary.com/namelessfy/video/upload/v1619002291/tracks/Zwette_feat._Tom_Rosenthal_-_Go_Solo_Official_Lyric_Video_vf7kpp.mp3",
      thumbnail:
        "https://res.cloudinary.com/namelessfy/image/upload/v1619002680/thumbnail/81IROWku2ML._SS500__un7y47.jpg",
      duration: 191,
      rating: 9.1,
      genre: "Chill House",
      authorId: "",
      artistId: [{ userName: "Zwette" }, { userName: "Tom Rosenthal" }],
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
    title: "Go Solo",
    url:
      "https://res.cloudinary.com/namelessfy/video/upload/v1619002291/tracks/Zwette_feat._Tom_Rosenthal_-_Go_Solo_Official_Lyric_Video_vf7kpp.mp3",
    thumbnail:
      "https://res.cloudinary.com/namelessfy/image/upload/v1619002680/thumbnail/81IROWku2ML._SS500__un7y47.jpg",
    duration: 191,
    rating: 9.1,
    genre: "Chill House",
    authorId: "",
    artistId: [{ userName: "Zwette" }, { userName: "Tom Rosenthal" }],
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
      const list = [state.currentSong, ...state.queue];
      const song = list.pop();

      console.log("list", list);
      console.log("song", song);

      return {
        ...state,
        currentSong: song,
        queue: list,
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
    default: {
      return state;
    }
  }
};

export default PlayerReducer;
