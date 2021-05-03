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

export const getPlaylistsRequest = () => ({
  type: PlaylistTypes.GET_PLAYLISTS_REQUEST,
});

export const getPlaylistsError = (message) => ({
  type: PlaylistTypes.GET_PLAYLISTS_ERROR,
  payload: message,
});

export const getPlaylistsSuccess = (playlists) => ({
  type: PlaylistTypes.GET_PLAYLISTS_SUCCESS,
  payload: playlists,
});

export function getPlaylists() {
  return async function playlistThunk(dispatch) {
    dispatch(getPlaylistsRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(getPlaylistsError("User token null!"));
      }

      const playlistRes = await api.getAllPlaylists({
        Authorization: `Bearer ${userToken}`,
      });

      if (playlistRes.errorMessage) {
        return dispatch(getPlaylistsError(playlistRes.errorMessage));
      }

      return dispatch(getPlaylistsSuccess(playlistRes.data.data));
    } catch (err) {
      return dispatch(getPlaylistsError(err.message));
    }
  };
}

export const getPlaylistsReset = () => ({
  type: PlaylistTypes.GET_PLAYLISTS_RESET,
});

export const playlistReset = () => ({
  type: PlaylistTypes.PLAYLIST_RESET,
});
