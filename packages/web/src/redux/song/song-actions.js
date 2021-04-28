import * as UserTypes from "./song-types";
import api from "../../api";
import * as auth from "../../services/auth";

export function editSong(formData) {
  return async function editSongThunk(dispatch) {
    dispatch(editSongRequest());

    try {
      const userToken = await auth.getCurrentUserToken();

      if (!userToken) {
        return dispatch(editSongError("User token null!"));
      }

      const editSongRes = await api.editTrack(
        {
          Authorization: `Bearer ${userToken}`,
        },
        formData,
      );

      if (editSongRes.errorMessage) {
        return dispatch(editSongError(editSongRes.errorMessage));
      }

      return dispatch(editSongSuccess(editSongRes.data.data));
    } catch (err) {
      return dispatch(editSongError(err.message));
    }
  };
}

export const editSongRequest = () => ({
  type: UserTypes.EDIT_SONG_REQUEST,
});

export const editSongError = (message) => ({
  type: UserTypes.EDIT_SONG_ERROR,
  payload: message,
});

export const editSongSuccess = (song) => ({
  type: UserTypes.EDIT_SONG_SUCCESS,
  payload: song,
});
