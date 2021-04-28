import * as UserTypes from "./song-types";
import { updateEditSong } from "../../utils/favoritesUtils";

export const SongInitialState = {
  isEditingSong: false,
  editSongError: null,
};

const SongReducer = (state = SongInitialState, action) => {
  switch (action.type) {
    case UserTypes.EDIT_SONG_SUCCESS: {
      return {
        ...state,
        isEditingSong: false,
        mySongs: updateEditSong(action.payload, [...state.mySongs]),
      };
    }
    case UserTypes.EDIT_SONG_ERROR: {
      return {
        ...state,
        isEditingSong: false,
        editSongError: action.payload,
      };
    }
    case UserTypes.EDIT_SONG_REQUEST: {
      return {
        ...state,
        isEditingSong: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default SongReducer;
