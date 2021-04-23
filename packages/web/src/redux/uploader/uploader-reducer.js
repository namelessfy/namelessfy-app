import * as UploaderTypes from "./uploader-types";

export const UploaderInitialState = {
  isUploadingSong: false,
  uploadSongSuccess: false,
  uploadSongError: null,
  songUrls: [],
};

const UploaderReducer = (state = UploaderInitialState, action) => {
  switch (action.type) {
    case UploaderTypes.UPLOAD_SONG_REQUEST: {
      return {
        ...state,
        isUploadingSong: true,
        uploadSongSuccess: false,
        uploadSongError: null,
      };
    }
    case UploaderTypes.UPLOAD_SONG_ERROR: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: false,
        uploadSongError: action.payload,
      };
    }
    case UploaderTypes.UPLOAD_SONG_SUCCESS: {
      return {
        ...state,
        isUploadingSong: false,
        uploadSongSuccess: true,
        uploadSongError: null,
        songUrls: [...state.songUrls, action.payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default UploaderReducer;
