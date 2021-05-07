import * as PlaylistTypes from "./playlist-types";
import api from "../../api";
import * as auth from "../../services/auth";
import { getCurrentUserToken } from "../../services/auth";

export const createPlaylistRequest = () => ({
  type: PlaylistTypes.CREATE_PLAYLIST_REQUEST,
});

export const createPlaylistError = (message) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_ERROR,
  payload: message,
});

export const createPlaylistSuccess = (playlist) => ({
  type: PlaylistTypes.CREATE_PLAYLIST_SUCCESS,
  payload: playlist,
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

      const playlistRes = await api.getFavoritePlaylists({
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

export const setCacheSongId = (id) => ({
  type: PlaylistTypes.SET_CACHE_SONG_ID,
  payload: id,
});

export const addToPlaylistRequest = () => ({
  type: PlaylistTypes.ADD_TO_PLAYLIST_REQUEST,
});

export const addToPlaylistError = (message) => ({
  type: PlaylistTypes.ADD_TO_PLAYLIST_ERROR,
  payload: message,
});

export const addToPlaylistSuccess = (playlist) => ({
  type: PlaylistTypes.ADD_TO_PLAYLIST_SUCCESS,
  payload: playlist,
});

export function addToPlaylist(songId, playlistId) {
  return async function playlistThunk(dispatch) {
    dispatch(addToPlaylistRequest());

    try {
      const userToken = await getCurrentUserToken();
      if (!userToken) {
        return dispatch(addToPlaylistError("User token null!"));
      }
      const playlistRes = await api.addSongToPlaylist(
        {
          Authorization: `Bearer ${userToken}`,
        },
        songId,
        playlistId,
      );

      if (playlistRes.errorMessage) {
        return dispatch(addToPlaylistError(playlistRes.errorMessage));
      }
      return dispatch(addToPlaylistSuccess(playlistRes.data.data));
    } catch (err) {
      return dispatch(addToPlaylistError(err.message));
    }
  };
}

export const addToPlaylistReset = () => ({
  type: PlaylistTypes.ADD_TO_PLAYLIST_RESET,
});

export const editPlaylistRequest = () => ({
  type: PlaylistTypes.EDIT_PLAYLIST_REQUEST,
});

export const editPlaylistError = (message) => ({
  type: PlaylistTypes.EDIT_PLAYLIST_ERROR,
  payload: message,
});

export const editPlaylistSuccess = (playlist) => ({
  type: PlaylistTypes.EDIT_PLAYLIST_SUCCESS,
  payload: playlist,
});

export function editPlaylist(formData, id) {
  return async function editPlaylistThunk(dispatch) {
    dispatch(editPlaylistRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(editPlaylistError("User token null!"));
      }
      const playlistRes = await api.editPlaylistById(
        {
          Authorization: `Bearer ${userToken}`,
        },
        formData,
        id,
      );

      if (playlistRes.errorMessage) {
        return dispatch(editPlaylistError(playlistRes.errorMessage));
      }

      return dispatch(editPlaylistSuccess(playlistRes.data.data));
    } catch (err) {
      return dispatch(editPlaylistError(err.message));
    }
  };
}

export const editPlaylistReset = () => ({
  type: PlaylistTypes.EDIT_PLAYLIST_RESET,
});

export const deletePlaylistRequest = () => ({
  type: PlaylistTypes.DELETE_PLAYLIST_REQUEST,
});

export const deletePlaylistError = (message) => ({
  type: PlaylistTypes.DELETE_PLAYLIST_ERROR,
  payload: message,
});

export const deletePlaylistSuccess = (playlist) => ({
  type: PlaylistTypes.DELETE_PLAYLIST_SUCCESS,
  payload: playlist,
});

export function deletePlaylist(id) {
  return async function deletePlaylistThunk(dispatch) {
    dispatch(deletePlaylistRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(deletePlaylistError("User token null!"));
      }

      const playlistRes = await api.deletePlaylistById(
        {
          Authorization: `Bearer ${userToken}`,
        },
        id,
      );

      if (playlistRes.errorMessage) {
        return dispatch(deletePlaylistError(playlistRes.errorMessage));
      }

      return dispatch(deletePlaylistSuccess(playlistRes.data.data));
    } catch (err) {
      return dispatch(deletePlaylistError(err.message));
    }
  };
}

export const deletePlaylistReset = () => ({
  type: PlaylistTypes.DELETE_PLAYLIST_RESET,
});

export const setPlaylistInfo = (playlist) => ({
  type: PlaylistTypes.SET_PLAYLIST_INFO,
  payload: playlist,
});

export const likePlaylist = (id) => {
  return async function likePlaylistThunk(dispatch) {
    dispatch(likePlaylistRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(likePlaylistError("Error Getting the token"));
    }

    const response = await api.likePlaylist(
      {
        Authorization: `Bearer ${token}`,
      },
      id,
    );

    if (response.errorMessage) {
      return dispatch(likePlaylistError(response.errorMessage));
    }

    return dispatch(likePlaylistSuccess(response.data.data));
  };
};

export const likePlaylistRequest = () => ({
  type: PlaylistTypes.LIKE_PLAYLIST_REQUEST,
});

export const likePlaylistError = (error) => ({
  type: PlaylistTypes.LIKE_PLAYLIST_ERROR,
  payload: error,
});

export const likePlaylistSuccess = (playlist) => ({
  type: PlaylistTypes.LIKE_PLAYLIST_SUCCESS,
  payload: playlist,
});

export const dislikePlaylist = (id) => {
  return async function dislikePlaylistThunk(dispatch) {
    dispatch(dislikePlaylistRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(dislikePlaylistError("Error Getting the token"));
    }

    const response = await api.dislikePlaylist(
      {
        Authorization: `Bearer ${token}`,
      },
      id,
    );

    if (response.errorMessage) {
      return dispatch(dislikePlaylistError(response.errorMessage));
    }

    return dispatch(dislikePlaylistSuccess(response.data.data));
  };
};

export const dislikePlaylistRequest = () => ({
  type: PlaylistTypes.DISLIKE_PLAYLIST_REQUEST,
});

export const dislikePlaylistError = (error) => ({
  type: PlaylistTypes.DISLIKE_PLAYLIST_ERROR,
  payload: error,
});

export const dislikePlaylistSuccess = (playlist) => ({
  type: PlaylistTypes.DISLIKE_PLAYLIST_SUCCESS,
  payload: playlist,
});

export const playlistReset = () => ({
  type: PlaylistTypes.PLAYLIST_RESET,
});
