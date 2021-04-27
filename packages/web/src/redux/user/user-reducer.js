import * as UserTypes from "./user-types";

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
        favorites: [...state.favorites, action.payload],
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
      const newFav = [...state.favorites].filter(
        (song) => song._id !== action.payload._id,
      );

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
        isSettinDislike: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
