import * as SongTypes from "./song-types";
import {
  removeFromLikedSongs,
  addToLikedSongs,
  updateEditSong,
} from "../../utils/favoritesUtils";

export const SongInitialState = {
  isEditingSong: false,
  editSongError: null,
  favorites: [],
  setFavoritesError: null,
  isGettingFavorites: false,
  isSettinLike: false,
  likeError: null,
  isSettingDislike: false,
  dislikeError: null,
  mySongs: null,
  isGettingMySongs: false,
  getMySongsError: null,
  isUploadingSong: false,
  uploadSongSuccess: false,
  uploadSongError: null,
};

const SongReducer = (state = SongInitialState, action) => {
  switch (action.type) {
    case SongTypes.EDIT_SONG_SUCCESS: {
      return {
        ...state,
        isEditingSong: false,
        mySongs: updateEditSong(action.payload, [...state.mySongs]),
      };
    }
    case SongTypes.EDIT_SONG_ERROR: {
      return {
        ...state,
        isEditingSong: false,
        editSongError: action.payload,
      };
    }
    case SongTypes.EDIT_SONG_REQUEST: {
      return {
        ...state,
        isEditingSong: true,
      };
    }
    case SongTypes.SET_FAVORITES_SUCCESS: {
      return {
        ...state,
        isGettingFavorites: false,
        favorites: action.payload,
      };
    }
    case SongTypes.SET_FAVORITES_ERROR: {
      return {
        ...state,
        isGettingFavorites: false,
        setFavoritesError: action.payload,
      };
    }
    case SongTypes.SET_FAVORITES_REQUEST: {
      return {
        ...state,
        isGettingFavorites: true,
      };
    }
    case SongTypes.LIKE_SUCCESS: {
      return {
        ...state,
        isSettingLike: false,
        favorites: addToLikedSongs(action.payload, [...state.favorites]),
      };
    }
    case SongTypes.LIKE_ERROR: {
      return {
        ...state,
        isSettingLike: false,
        likeError: action.payload,
      };
    }
    case SongTypes.LIKE_REQUEST: {
      return {
        ...state,
        isSettinLike: true,
      };
    }
    case SongTypes.DISLIKE_SUCCESS: {
      const newFav = removeFromLikedSongs(action.payload._id, [
        ...state.favorites,
      ]);

      return {
        ...state,
        isSettingDislike: false,
        favorites: newFav,
      };
    }
    case SongTypes.DISLIKE_ERROR: {
      return {
        ...state,
        isSettingDislike: false,
        dislikeError: action.payload,
      };
    }
    case SongTypes.DISLIKE_REQUEST: {
      return {
        ...state,
        isSettingDislike: true,
      };
    }
    case SongTypes.GET_MYSONGS_SUCCESS: {
      return {
        ...state,
        isGettingMySongs: false,
        mySongs: [...action.payload],
      };
    }
    case SongTypes.GET_MYSONGS_ERROR: {
      return {
        ...state,
        isGettingMySongs: false,
        getMySongsError: action.payload,
      };
    }
    case SongTypes.GET_MYSONGS_REQUEST: {
      return {
        ...state,
        isGettingMySongs: true,
      };
    }
    case SongTypes.UPLOAD_SONG_REQUEST: {
      return {
        ...state,
        isUploadingSong: true,
        uploadSongSuccess: false,
        uploadSongError: null,
      };
    }
    case SongTypes.UPLOAD_SONG_ERROR: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: false,
        uploadSongError: action.payload,
      };
    }
    case SongTypes.UPLOAD_SONG_SUCCESS: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: true,
        uploadSongError: null,
        mySongs: [...state.mySongs, action.payload],
      };
    }
    case SongTypes.UPLOAD_SONG_RESET: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: false,
        uploadSongError: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default SongReducer;
