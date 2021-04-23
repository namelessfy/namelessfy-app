import * as UploaderTypes from "./uploader-types";
import { getFileUrl } from "../../services/cloudinary";
import api from "../../api";
import { getCurrentUserToken } from "../../services/auth";

export const uploadSongRequest = () => ({
  type: UploaderTypes.UPLOAD_SONG_REQUEST,
});

export const uploadSongError = (message) => ({
  type: UploaderTypes.UPLOAD_SONG_ERROR,
  payload: message,
});

export const uploadSongSuccess = (songUrl) => ({
  type: UploaderTypes.UPLOAD_SONG_SUCCESS,
  payload: songUrl,
});

export function uploadSong({ track, title }) {
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

      const songRes = await api.createTrack({
        body: {
          title: title,
          url: url,
          duration: duration,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (songRes.errorMessage) {
        return dispatch(uploadSongError(songRes.errorMessage));
      }

      return dispatch(uploadSongSuccess(url));
    } catch (err) {
      return dispatch(uploadSongError(err.message));
    }
  };
}
