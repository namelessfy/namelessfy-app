import * as PlaylistTypes from "./playlist-types";
import { updateList } from "../../utils/utils";

export const PlaylistInitialState = {
  myPlaylists: [],
  isCreatingPlaylist: false,
  createPlaylistError: null,
  createPlaylistSuccess: false,
};

const PlaylistReducer = (state = PlaylistInitialState, action) => {
  switch (action.type) {
    case PlaylistTypes.CREATE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isCreatingPlaylist: false,
        createPlaylistSuccess: true,
        myPlaylists: updateList(action.payload, [...state.myPlaylists]),
      };
    }
    case PlaylistTypes.CREATE_PLAYLIST_REQUEST: {
      return {
        ...state,
        isCreatingPlaylist: true,
        createPlaylistSuccess: false,
        createPlaylistError: null,
      };
    }
    case PlaylistTypes.CREATE_PLAYLIST_ERROR: {
      return {
        ...state,
        isCreatingPlaylist: false,
        createPlaylistSuccess: false,
        createPlaylistError: action.payload,
      };
    }
    case PlaylistTypes.CREATE_PLAYLIST_RESET: {
      return {
        ...state,
        isCreatingPlaylist: false,
        createPlaylistSuccess: false,
        createPlaylistError: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default PlaylistReducer;
