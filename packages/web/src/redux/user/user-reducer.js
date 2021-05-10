import * as UserTypes from "./user-types";

export const UserInitialState = {
  isEditingUser: false,
  editUserError: null,
  currentUser: {
    email: null,
  },
  initialView: "song",
  isGettingUser: false,
  getUserError: null,
  user: null,
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
    case UserTypes.SET_USER_VIEW: {
      return {
        ...state,
        initialView: action.payload,
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
        initialView: "song",
      };
    }
    case UserTypes.GET_USER_REQUEST: {
      return {
        ...state,
        isGettingUser: true,
        getUserError: null,
      };
    }
    case UserTypes.GET_USER_ERROR: {
      return {
        ...state,
        isGettingUser: false,
        getUserError: action.payload,
      };
    }
    case UserTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        isGettingUser: false,
        getUserError: null,
        user: action.payload,
      };
    }
    case UserTypes.GET_USER_RESET: {
      return {
        ...state,
        isGettingUser: false,
        getUserError: null,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
