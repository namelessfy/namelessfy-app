import * as SongTypes from "./song-types";
import { removeFromList, updateList, updateListById } from "../../utils/utils";

export const SongInitialState = {
  isEditingSong: false,
  editSongError: null,
  editingSuccess: false,
  favorites: [],
  setFavoritesError: null,
  isGettingFavorites: false,
  isSettingLike: false,
  likeError: null,
  isSettingDislike: false,
  dislikeError: null,
  mySongs: [],
  isGettingMySongs: false,
  getMySongsError: null,
  isUploadingSong: false,
  uploadSongSuccess: false,
  uploadSongError: null,
  isdeletingSong: false,
  deletingSuccess: false,
  deleteSongError: null,

  isGettingUserSongs: false,
  getUserSongsError: null,
  userSongs: [],
  isGettingUserFavorites: false,
  getUserFavoritesError: null,
  userFavorites: [],
};

const SongReducer = (state = SongInitialState, action) => {
  switch (action.type) {
    case SongTypes.EDIT_SONG_SUCCESS: {
      return {
        ...state,
        isEditingSong: false,
        editingSuccess: true,
        mySongs: updateListById(action.payload, [...state.mySongs]),
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
    case SongTypes.EDIT_SONG_RESET: {
      return {
        ...state,
        isEditingSong: false,
        editingSuccess: false,
        editSongError: null,
      };
    }
    case SongTypes.DELETE_SONG_SUCCESS: {
      return {
        ...state,
        isdeletingSong: false,
        deletingSuccess: true,
        mySongs: removeFromList(action.payload._id, [...state.mySongs]),
        favorites: removeFromList(action.payload._id, [...state.favorites]),
      };
    }
    case SongTypes.DELETE_SONG_ERROR: {
      return {
        ...state,
        isdeletingSong: false,
        deleteSongError: action.payload,
      };
    }
    case SongTypes.DELETE_SONG_REQUEST: {
      return {
        ...state,
        isdeletingSong: true,
      };
    }
    case SongTypes.DELETE_SONG_RESET: {
      return {
        ...state,
        isdeletingSong: false,
        deletingSuccess: false,
        deleteSongError: null,
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
        favorites: updateList(action.payload, [...state.favorites]),
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
        isSettingLike: true,
      };
    }
    case SongTypes.DISLIKE_SUCCESS: {
      const newFav = removeFromList(action.payload, state.favorites);

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
        mySongs: [action.payload, ...state.mySongs],
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

    case SongTypes.GET_USER_SONGS_REQUEST: {
      return {
        ...state,
        isGettingUserSongs: true,
        getUserSongsSuccess: false,
        getUserSongsError: null,
      };
    }
    case SongTypes.GET_USER_SONGS_ERROR: {
      return {
        ...state,
        isGettingUserSongs: false,
        getUserSongsSuccess: false,
        getUserSongsError: action.payload,
      };
    }
    case SongTypes.GET_USER_SONGS_SUCCESS: {
      return {
        ...state,
        isGettingUserSongs: false,
        getUserSongsSuccess: true,
        getUserSongsError: null,
        userSongs: action.payload,
      };
    }
    case SongTypes.GET_USER_SONGS_RESET: {
      return {
        ...state,
        isGettingUserSongs: false,
        getUserSongsSuccess: false,
        getUserSongsError: null,
        userSongs: [],
      };
    }
    case SongTypes.GET_USER_FAVORITES_REQUEST: {
      return {
        ...state,
        isGettingUserFavorites: true,
        getUserFavoritesSuccess: false,
        getUserFavoritesError: null,
      };
    }
    case SongTypes.GET_USER_FAVORITES_ERROR: {
      return {
        ...state,
        isGettingUserFavorites: false,
        getUserFavoritesSuccess: false,
        getUserFavoritesError: action.payload,
      };
    }
    case SongTypes.GET_USER_FAVORITES_SUCCESS: {
      return {
        ...state,
        isGettingUserFavorites: false,
        getUserFavoritesSuccess: true,
        getUserFavoritesError: null,
        userFavorites: action.payload,
      };
    }
    case SongTypes.GET_USER_FAVORITES_RESET: {
      return {
        ...state,
        isGettingUserSongs: false,
        getUserSongsSuccess: false,
        getUserSongsError: null,
        userFavorites: [],
      };
    }
    case SongTypes.SONG_RESET: {
      return {
        ...state,
        isEditingSong: false,
        editSongError: null,
        editingSuccess: false,
        favorites: [],
        setFavoritesError: null,
        isGettingFavorites: false,
        isSettingLike: false,
        likeError: null,
        isSettingDislike: false,
        dislikeError: null,
        mySongs: [],
        isGettingMySongs: false,
        getMySongsError: null,
        isUploadingSong: false,
        uploadSongSuccess: false,
        uploadSongError: null,
        isdeletingSong: false,
        deletingSuccess: false,
        deleteSongError: null,

        isGettingUserSongs: false,
        getUserSongsError: null,
        userSongs: [],
        isGettingUserFavorites: false,
        getUserFavoritesError: null,
        userFavorites: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default SongReducer;
