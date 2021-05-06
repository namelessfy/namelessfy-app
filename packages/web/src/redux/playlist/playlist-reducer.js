import * as PlaylistTypes from "./playlist-types";
import { updateList, updateListById } from "../../utils/utils";

export const PlaylistInitialState = {
  myPlaylists: null,
  isCreatingPlaylist: false,
  createPlaylistError: null,
  createPlaylistSuccess: false,
  isGettingMyPlaylists: false,
  getPlaylistsError: null,
  getPlaylistsSuccess: false,
  cacheSongId: null,
  isAddingToPlaylist: false,
  addToPlaylistSuccess: false,
  addToPlaylistError: null,
  playlistInfo: null,
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
    case PlaylistTypes.GET_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        isGettingMyPlaylists: false,
        getPlaylistsSuccess: true,
        myPlaylists: action.payload,
      };
    }
    case PlaylistTypes.GET_PLAYLISTS_REQUEST: {
      return {
        ...state,
        isGettingMyPlaylists: true,
        getPlaylistsSuccess: false,
        getPlaylistsError: null,
      };
    }
    case PlaylistTypes.GET_PLAYLISTS_ERROR: {
      return {
        ...state,
        isGettingMyPlaylists: false,
        getPlaylistsSuccess: false,
        getPlaylistsError: action.payload,
      };
    }
    case PlaylistTypes.GET_PLAYLISTS_RESET: {
      return {
        ...state,
        isGettingMyPlaylists: false,
        getPlaylistsSuccess: false,
        getPlaylistsError: null,
      };
    }
    case PlaylistTypes.SET_CACHE_SONG_ID: {
      return {
        ...state,
        cacheSongId: action.payload,
      };
    }
    case PlaylistTypes.ADD_TO_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isAddingToPlaylist: false,
        addToPlaylistSuccess: true,
        myPlaylists: updateListById(action.payload, state.myPlaylists),
      };
    }
    case PlaylistTypes.ADD_TO_PLAYLIST_REQUEST: {
      return {
        ...state,
        isAddingToPlaylist: true,
        addToPlaylistSuccess: false,
        addToPlaylistError: null,
      };
    }
    case PlaylistTypes.ADD_TO_PLAYLIST_ERROR: {
      return {
        ...state,
        isAddingToPlaylist: false,
        addToPlaylistSuccess: false,
        addToPlaylistError: action.payload,
      };
    }
    case PlaylistTypes.ADD_TO_PLAYLIST_RESET: {
      return {
        ...state,
        isAddingToPlaylist: false,
        addToPlaylistSuccess: false,
        addToPlaylistError: null,
      };
    }
    case PlaylistTypes.SET_PLAYLIST_INFO: {
      return {
        ...state,
        playlistInfo: action.payload,
      };
    }
    case PlaylistTypes.PLAYLIST_RESET: {
      return {
        ...state,
        myPlaylists: null,
        isCreatingPlaylist: false,
        createPlaylistError: null,
        createPlaylistSuccess: false,
        isGettingMyPlaylists: false,
        getPlaylistsError: null,
        getPlaylistsSuccess: false,
        cacheSongId: null,
        isAddingToPlaylist: false,
        addToPlaylistSuccess: false,
        addToPlaylistError: null,
        playlistInfo: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default PlaylistReducer;
