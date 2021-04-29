import * as SongTypes from "./song-types";
import api from "../../api";
import * as auth from "../../services/auth";
import { getCurrentUserToken } from "../../services/auth";
import { getFileUrl } from "../../services/cloudinary";

export function editSong(formData, id) {
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
        id,
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
  type: SongTypes.EDIT_SONG_REQUEST,
});

export const editSongError = (message) => ({
  type: SongTypes.EDIT_SONG_ERROR,
  payload: message,
});

export const editSongSuccess = (song) => ({
  type: SongTypes.EDIT_SONG_SUCCESS,
  payload: song,
});

export const editSongReset = () => ({
  type: SongTypes.EDIT_SONG_RESET,
});

export const getFavorites = () => {
  return async function getFavoritesThunk(dispatch) {
    dispatch(getFavoritesRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(getFavoritesError("Error Getting the token"));
    }

    const response = await api.getFavorites({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(getFavoritesError(response.errorMessage));
    }

    return dispatch(getFavoritesSuccess(response.data.data));
  };
};

export const getFavoritesRequest = () => ({
  type: SongTypes.SET_FAVORITES_REQUEST,
});

export const getFavoritesError = (error) => ({
  type: SongTypes.SET_FAVORITES_ERROR,
  payload: error,
});

export const getFavoritesSuccess = (favorites) => ({
  type: SongTypes.SET_FAVORITES_SUCCESS,
  payload: favorites,
});

export const likeSong = (trackId) => {
  return async function likeSongThunk(dispatch) {
    dispatch(likeSongRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(likeSongError("Error Getting the token"));
    }

    const response = await api.likeSong(
      {
        Authorization: `Bearer ${token}`,
      },
      trackId,
    );

    if (response.errorMessage) {
      return dispatch(likeSongError(response.errorMessage));
    }

    return dispatch(likeSongSuccess(response.data.data));
  };
};

export const likeSongRequest = () => ({
  type: SongTypes.LIKE_REQUEST,
});

export const likeSongError = (error) => ({
  type: SongTypes.LIKE_ERROR,
  payload: error,
});

export const likeSongSuccess = (song) => ({
  type: SongTypes.LIKE_SUCCESS,
  payload: song,
});

export const dislikeSong = (trackId) => {
  return async function dislikeSongThunk(dispatch) {
    dispatch(dislikeSongRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(dislikeSongError("Error Getting the token"));
    }

    const response = await api.dislikeSong(
      {
        Authorization: `Bearer ${token}`,
      },
      trackId,
    );

    if (response.errorMessage) {
      return dispatch(dislikeSongError(response.errorMessage));
    }

    return dispatch(dislikeSongSuccess(response.data.data));
  };
};

export const dislikeSongRequest = () => ({
  type: SongTypes.DISLIKE_REQUEST,
});

export const dislikeSongError = (error) => ({
  type: SongTypes.DISLIKE_ERROR,
  payload: error,
});

export const dislikeSongSuccess = (song) => ({
  type: SongTypes.DISLIKE_SUCCESS,
  payload: song,
});

export const getMySongs = () => {
  return async function getMySongsThunk(dispatch) {
    dispatch(getMySongsRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(getMySongsError("Error Getting the token"));
    }

    const response = await api.getSongs({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(getMySongsError(response.errorMessage));
    }

    return dispatch(getMySongsSuccess(response.data.data));
  };
};

export const getMySongsRequest = () => ({
  type: SongTypes.GET_MYSONGS_REQUEST,
});

export const getMySongsError = (error) => ({
  type: SongTypes.GET_MYSONGS_ERROR,
  payload: error,
});

export const getMySongsSuccess = (mySongs) => ({
  type: SongTypes.GET_MYSONGS_SUCCESS,
  payload: mySongs,
});

export const uploadSongRequest = () => ({
  type: SongTypes.UPLOAD_SONG_REQUEST,
});

export const uploadSongError = (message) => ({
  type: SongTypes.UPLOAD_SONG_ERROR,
  payload: message,
});

export const uploadSongSuccess = (songUrl) => ({
  type: SongTypes.UPLOAD_SONG_SUCCESS,
  payload: songUrl,
});

export function uploadSong({ track, formData }) {
  return async function uploadThunk(dispatch) {
    dispatch(uploadSongRequest());

    try {
      const userToken = await getCurrentUserToken();

      if (!userToken) {
        return dispatch(uploadSongError("User token null!"));
      }

      const urlRes = await getFileUrl({
        file: track,
      });

      if (urlRes.status >= 400) {
        return dispatch(uploadSongError(urlRes.statusText));
      }

      const { url, duration } = urlRes.data;

      formData.append("url", url);
      formData.append("duration", duration);

      console.log(duration);

      console.log([...formData.entries()]);

      const songRes = await api.createTrack(formData, {
        Authorization: `Bearer ${userToken}`,
      });

      if (songRes.errorMessage) {
        return dispatch(uploadSongError(songRes.errorMessage));
      }

      return dispatch(uploadSongSuccess(songRes.data.data));
    } catch (err) {
      return dispatch(uploadSongError(err.message));
    }
  };
}

export const uploadSongReset = () => ({
  type: SongTypes.UPLOAD_SONG_RESET,
});
