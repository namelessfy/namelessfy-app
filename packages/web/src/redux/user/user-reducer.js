import * as UserTypes from "./user-types";
import {
  removeFromLikedSongs,
  addToLikedSongs,
} from "../../utils/favoritesUtils";

export const UserInitialState = {
  isEditingUser: false,
  editUserError: null,
  currentUser: {
    email: null,
  },
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
};

const UserReducer = (state = UserInitialState, action) => {
  switch (action.type) {
    case UserTypes.EDIT_USER_REQUEST: {
      return {
        ...state,
        isEditingUser: true,
        editUserError: null,
      };
    }
    case UserTypes.EDIT_USER_ERROR: {
      return {
        ...state,
        isEditingUser: false,
        editUserError: action.payload,
      };
    }
    case UserTypes.EDIT_USER_SUCCESS: {
      return {
        ...state,
        isEditingUser: false,
        editUserError: null,
        currentUser: action.payload,
      };
    }
    case UserTypes.SET_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case UserTypes.SET_FAVORITES_SUCCESS: {
      return {
        ...state,
        isGettingFavorites: false,
        favorites: action.payload,
      };
    }
    case UserTypes.SET_FAVORITES_ERROR: {
      return {
        ...state,
        isGettingFavorites: false,
        setFavoritesError: action.payload,
      };
    }
    case UserTypes.SET_FAVORITES_REQUEST: {
      return {
        ...state,
        isGettingFavorites: true,
      };
    }
    case UserTypes.LIKE_SUCCESS: {
      return {
        ...state,
        isSettingLike: false,
        favorites: addToLikedSongs(action.payload, [...state.favorites]),
      };
    }
    case UserTypes.LIKE_ERROR: {
      return {
        ...state,
        isSettingLike: false,
        likeError: action.payload,
      };
    }
    case UserTypes.LIKE_REQUEST: {
      return {
        ...state,
        isSettinLike: true,
      };
    }
    case UserTypes.DISLIKE_SUCCESS: {
      const newFav = removeFromLikedSongs(action.payload._id, [
        ...state.favorites,
      ]);

      return {
        ...state,
        isSettingDislike: false,
        favorites: newFav,
      };
    }
    case UserTypes.DISLIKE_ERROR: {
      return {
        ...state,
        isSettingDislike: false,
        dislikeError: action.payload,
      };
    }
    case UserTypes.DISLIKE_REQUEST: {
      return {
        ...state,
        isSettingDislike: true,
      };
    }
    case UserTypes.GET_MYSONGS_SUCCESS: {
      return {
        ...state,
        isGettingMySongs: false,
        mySongs: [...action.payload],
      };
    }
    case UserTypes.GET_MYSONGS_ERROR: {
      return {
        ...state,
        isGettingMySongs: false,
        getMySongsError: action.payload,
      };
    }
    case UserTypes.GET_MYSONGS_REQUEST: {
      return {
        ...state,
        isGettingMySongs: true,
      };
    }
    case UserTypes.RESET_USER: {
      return {
        ...state,
        isEditingUser: false,
        editUserError: null,
        currentUser: {
          email: null,
        },
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
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
