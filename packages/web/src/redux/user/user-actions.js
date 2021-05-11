import * as UserTypes from "./user-types";
import api from "../../api";
import * as auth from "../../services/auth";

export function editUser(formData) {
  return async function editUserThunk(dispatch) {
    dispatch(editUserRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(editUserError("Error Getting the token"));
    }

    const response = await api.editUser(
      {
        Authorization: `Bearer ${token}`,
      },
      formData,
    );

    if (response.errorMessage) {
      return dispatch(editUserError(response.errorMessage));
    }
    return dispatch(editUserSuccess(response.data.data));
  };
}

export const editUserRequest = () => ({
  type: UserTypes.EDIT_USER_REQUEST,
});

export const editUserError = (message) => ({
  type: UserTypes.EDIT_USER_ERROR,
  payload: message,
});

export const editUserSuccess = (user) => ({
  type: UserTypes.EDIT_USER_SUCCESS,
  payload: user,
});

export const setUser = (user) => ({
  type: UserTypes.SET_USER,
  payload: user,
});

export function setUserView(view) {
  return {
    type: UserTypes.SET_USER_VIEW,
    payload: view,
  };
}

export const getUserRequest = () => ({
  type: UserTypes.GET_USER_REQUEST,
});

export const getUserError = (message) => ({
  type: UserTypes.GET_USER_ERROR,
  payload: message,
});

export const getUserSuccess = (user) => ({
  type: UserTypes.GET_USER_SUCCESS,
  payload: user,
});

export function getUser(userName) {
  return async function getUserThunk(dispatch) {
    dispatch(getUserRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(getUserError("Error Getting the token"));
    }

    const response = await api.getUserByUsername(
      {
        Authorization: `Bearer ${token}`,
      },
      userName,
    );

    if (response.errorMessage) {
      return dispatch(getUserError(response.errorMessage));
    }
    return dispatch(getUserSuccess(response.data.data));
  };
}

export const getUserReset = (user) => ({
  type: UserTypes.GET_USER_RESET,
  payload: user,
});

export const getFollowedUsersRequest = () => ({
  type: UserTypes.GET_FOLLOWED_USERS_REQUEST,
});

export const getFollowedUsersError = (message) => ({
  type: UserTypes.GET_FOLLOWED_USERS_ERROR,
  payload: message,
});

export const getFollowedUsersSuccess = (followedUsers) => ({
  type: UserTypes.GET_FOLLOWED_USERS_SUCCESS,
  payload: followedUsers,
});

export function getFollowedUsers() {
  return async function getFollowedUsersThunk(dispatch) {
    dispatch(getFollowedUsersRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(getFollowedUsersError("Error Getting the token"));
    }

    const response = await api.getFollowedUsersById({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(getFollowedUsersError(response.errorMessage));
    }
    return dispatch(getFollowedUsersSuccess(response.data.data));
  };
}

export const getFollowedUsersReset = () => ({
  type: UserTypes.GET_FOLLOWED_USERS_RESET,
});

export const followUserRequest = () => ({
  type: UserTypes.FOLLOW_USER_REQUEST,
});

export const followUserError = (message) => ({
  type: UserTypes.FOLLOW_USER_ERROR,
  payload: message,
});

export const followUserSuccess = (user) => ({
  type: UserTypes.FOLLOW_USER_SUCCESS,
  payload: user,
});

export function followUser(id) {
  return async function followUserThunk(dispatch) {
    dispatch(followUserRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(followUserError("Error Getting the token"));
    }

    const response = await api.followUserById(
      {
        Authorization: `Bearer ${token}`,
      },
      id,
    );

    if (response.errorMessage) {
      return dispatch(followUserError(response.errorMessage));
    }
    return dispatch(followUserSuccess(response.data.data));
  };
}

export const followUserReset = () => ({
  type: UserTypes.FOLLOW_USER_RESET,
});

export const unfollowUserRequest = () => ({
  type: UserTypes.UNFOLLOW_USER_REQUEST,
});

export const unfollowUserError = (message) => ({
  type: UserTypes.UNFOLLOW_USER_ERROR,
  payload: message,
});

export const unfollowUserSuccess = (user) => ({
  type: UserTypes.UNFOLLOW_USER_SUCCESS,
  payload: user,
});

export function unfollowUser(id) {
  return async function unfollowUserThunk(dispatch) {
    dispatch(unfollowUserRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(unfollowUserError("Error Getting the token"));
    }

    const response = await api.unfollowUserById(
      {
        Authorization: `Bearer ${token}`,
      },
      id,
    );

    if (response.errorMessage) {
      return dispatch(unfollowUserError(response.errorMessage));
    }
    return dispatch(unfollowUserSuccess(response.data.data));
  };
}

export const unfollowUserReset = () => ({
  type: UserTypes.UNFOLLOW_USER_RESET,
});

export const resetUser = () => ({
  type: UserTypes.RESET_USER,
});
