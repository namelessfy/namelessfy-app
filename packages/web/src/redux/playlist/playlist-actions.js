import * as PlaylistTypes from "./playlist-types";
import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";

export const createPlaylistRequest = () => ({
  type: PlaylistTypes.CREATE_PLAYLIST_REQUEST,
});

export const createPlaylistError = (message) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_ERROR,
  payload: message,
});

export const createPlaylistSuccess = (songUrl) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_SUCCESS,
  payload: songUrl,
});

export function createPlaylist(formData) {
  return async function playlistThunk(dispatch) {
    dispatch(createPlaylistRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(createPlaylistError("User token null!"));
      }

      const playlistRes = await api.createPlaylist(
        {
          Authorization: `Bearer ${userToken}`,
        },
        formData,
      );

      if (playlistRes.errorMessage) {
        return dispatch(createPlaylistError(playlistRes.errorMessage));
      }

      return dispatch(createPlaylistSuccess(playlistRes.data.data));
    } catch (err) {
      return dispatch(createPlaylistError(err.message));
    }
  };
}

export const createPlaylistReset = () => ({
  type: PlaylistTypes.CREATE_PLAYLIST_RESET,
});

export const playlistReset = () => ({
  type: PlaylistTypes.PLAYLIST_RESET,
});
