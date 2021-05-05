import * as UserTypes from "./user-types";

export const UserInitialState = {
  isEditingUser: false,
  editUserError: null,
  currentUser: {
    email: null,
  },
  initialView: "song",
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
    default: {
      return state;
    }
  }
};

export default UserReducer;
