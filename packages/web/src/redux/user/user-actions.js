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
    return dispatch(editUserSuccess(response.data));
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

export const resetUser = () => ({
  type: UserTypes.RESET_USER,
});
