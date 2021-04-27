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
    default: {
      return state;
    }
  }
};

export default UserReducer;
