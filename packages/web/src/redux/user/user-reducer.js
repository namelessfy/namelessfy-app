import { removeFromList } from "../../utils/utils";
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

  followedUsers: [],
  isGettingFollowedUsers: false,
  getFollowedUsersError: null,

  isSettingFollowUser: false,
  followUserError: null,

  isSettingUnfollowUser: false,
  unfollowUserError: null,

  othersFollowedUsers: [],
  isGettingOthersFollowedUsers: false,
  getOthersFollowedUsersError: null,
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

    case UserTypes.GET_FOLLOWED_USERS_REQUEST: {
      return {
        ...state,
        isGettingFollowedUsers: true,
        getFollowedUsersError: null,
      };
    }
    case UserTypes.GET_FOLLOWED_USERS_ERROR: {
      return {
        ...state,
        isGettingFollowedUsers: false,
        getFollowedUsersError: action.payload,
      };
    }
    case UserTypes.GET_FOLLOWED_USERS_SUCCESS: {
      return {
        ...state,
        isGettingFollowedUsers: false,
        getFollowedUsersError: null,
        followedUsers: action.payload,
      };
    }
    case UserTypes.GET_FOLLOWED_USERS_RESET: {
      return {
        ...state,
        isGettingFollowedUsers: false,
        getFollowedUsersError: null,
      };
    }

    case UserTypes.FOLLOW_USER_REQUEST: {
      return {
        ...state,
        isSettingFollowUser: true,
        followUserError: null,
      };
    }
    case UserTypes.FOLLOW_USER_ERROR: {
      return {
        ...state,
        isSettingFollowUser: false,
        followUserError: action.payload,
      };
    }
    case UserTypes.FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        isSettingFollowUser: false,
        followUserError: null,
        followedUsers: [...state.followedUsers, action.payload],
      };
    }
    case UserTypes.FOLLOW_USER_RESET: {
      return {
        ...state,
        isSettingFollowUser: false,
        followUserError: null,
      };
    }

    case UserTypes.UNFOLLOW_USER_REQUEST: {
      return {
        ...state,
        isSettingUnfollowUser: true,
        unfollowUserError: null,
      };
    }
    case UserTypes.UNFOLLOW_USER_ERROR: {
      return {
        ...state,
        isSettingUnfollowUser: false,
        unfollowUserError: action.payload,
      };
    }
    case UserTypes.UNFOLLOW_USER_SUCCESS: {
      return {
        ...state,
        isSettingUnfollowUser: false,
        unfollowUserError: null,
        followedUsers: removeFromList(action.payload, state.followedUsers),
      };
    }
    case UserTypes.UNFOLLOW_USER_RESET: {
      return {
        ...state,
        isSettingUnfollowUser: false,
        unfollowUserError: null,
      };
    }

    case UserTypes.GET_OTHERS_FOLLOWED_USERS_REQUEST: {
      return {
        ...state,
        isGettingoOthersFollowedUsers: true,
        getOthersFollowedUsersError: null,
      };
    }
    case UserTypes.GET_OTHERS_FOLLOWED_USERS_ERROR: {
      return {
        ...state,
        isGettingoOthersFollowedUsers: false,
        getOthersFollowedUsersError: action.payload,
      };
    }
    case UserTypes.GET_OTHERS_FOLLOWED_USERS_SUCCESS: {
      return {
        ...state,
        isGettingoOthersFollowedUsers: false,
        getOthersFollowedUsersError: null,
        othersFollowedUsers: action.payload,
      };
    }
    case UserTypes.GET_OTHERS_FOLLOWED_USERS_RESET: {
      return {
        ...state,
        othersFollowedUsers: [],
        isGettingOthersFollowedUsers: false,
        getOthersFollowedUsersError: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default UserReducer;
