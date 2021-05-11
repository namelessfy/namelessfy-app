import * as PlaylistTypes from "./playlist-types";
import {
  updateList,
  updateListById,
  removeFromList,
  addToLikedList,
  removeFromLikedList,
} from "../../utils/utils";

export const PlaylistInitialState = {
  myPlaylists: [],
  isCreatingPlaylist: false,
  createPlaylistError: null,
  createPlaylistSuccess: false,
  isGettingMyPlaylists: false,
  getPlaylistsError: null,
  getPlaylistsSuccess: false,
  playlistInfo: null,
  isGettingOnePlaylist: false,
  getOnePlaylistError: null,
  getOnePlaylistSuccess: false,
  cacheSongId: null,
  isAddingToPlaylist: false,
  addToPlaylistSuccess: false,
  addToPlaylistError: null,
  isEditingPlaylist: false,
  editPlaylistSuccess: false,
  editPlaylistError: null,
  isDeletingPlaylist: false,
  deletePlaylistSuccess: false,
  deletePlaylistError: null,
  isSettingLikePlaylist: false,
  likePlaylistError: null,
  isSettingDislikePlaylist: false,
  dislikePlaylistError: null,
  isRemoving: false,
  removeSuccess: false,
  removeError: null,

  isGettingUserPlaylists: false,
  getUserPlaylistsError: null,
  userPlaylists: [],
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
    case PlaylistTypes.GET_ONE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isGettingOnePlaylist: false,
        getOnePlaylistSuccess: true,
        playlistInfo: action.payload,
      };
    }
    case PlaylistTypes.GET_ONE_PLAYLIST_REQUEST: {
      return {
        ...state,
        isGettingOnePlaylist: true,
        getOnePlaylistSuccess: false,
        getOnePlaylistError: null,
      };
    }
    case PlaylistTypes.GET_ONE_PLAYLIST_ERROR: {
      return {
        ...state,
        isGettingOnePlaylist: false,
        getOnePlaylistSuccess: false,
        getOnePlaylistError: action.payload,
      };
    }
    case PlaylistTypes.GET_ONE_PLAYLIST_RESET: {
      return {
        ...state,
        isGettingOnePlaylist: false,
        getOnePlaylistSuccess: false,
        getOnePlaylistError: null,
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
    case PlaylistTypes.EDIT_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isEditingPlaylist: false,
        editPlaylistSuccess: true,
        myPlaylists: updateListById(action.payload, [...state.myPlaylists]),
      };
    }
    case PlaylistTypes.EDIT_PLAYLIST_REQUEST: {
      return {
        ...state,
        isEditingPlaylist: true,
        editPlaylistSuccess: false,
        editPlaylistError: null,
      };
    }
    case PlaylistTypes.EDIT_PLAYLIST_ERROR: {
      return {
        ...state,
        isEditingPlaylist: false,
        editPlaylistSuccess: false,
        editPlaylistError: action.payload,
      };
    }
    case PlaylistTypes.EDIT_PLAYLIST_RESET: {
      return {
        ...state,
        isEditingPlaylist: false,
        editPlaylistSuccess: false,
        editPlaylistError: null,
      };
    }
    case PlaylistTypes.DELETE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isDeletingPlaylist: false,
        deletePlaylistSuccess: true,
        myPlaylists: removeFromList(action.payload, [...state.myPlaylists]),
      };
    }
    case PlaylistTypes.DELETE_PLAYLIST_REQUEST: {
      return {
        ...state,
        isDeletingPlaylist: true,
        deletePlaylistSuccess: false,
        deletePlaylistError: null,
      };
    }
    case PlaylistTypes.DELETE_PLAYLIST_ERROR: {
      return {
        ...state,
        isDeletingPlaylist: false,
        deletePlaylistSuccess: false,
        deletePlaylistError: action.payload,
      };
    }
    case PlaylistTypes.DELETE_PLAYLIST_RESET: {
      return {
        ...state,
        isDeletingPlaylist: false,
        deletePlaylistSuccess: false,
        deletePlaylistError: null,
      };
    }
    case PlaylistTypes.SET_PLAYLIST_INFO: {
      return {
        ...state,
        playlistInfo: action.payload,
      };
    }

    case PlaylistTypes.LIKE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isSettingLikePlaylist: false,
        myPlaylists: addToLikedList(action.payload, [...state.myPlaylists]),
      };
    }
    case PlaylistTypes.LIKE_PLAYLIST_ERROR: {
      return {
        ...state,
        isSettingLikePlaylist: false,
        likePlaylistError: action.payload,
      };
    }
    case PlaylistTypes.LIKE_PLAYLIST_REQUEST: {
      return {
        ...state,
        isSettingLikePlaylist: true,
      };
    }
    case PlaylistTypes.DISLIKE_PLAYLIST_SUCCESS: {
      const newFav = removeFromLikedList(action.payload, [
        ...state.myPlaylists,
      ]);
      return {
        ...state,
        isSettingDislikePlaylist: false,
        myPlaylists: newFav,
      };
    }
    case PlaylistTypes.DISLIKE_PLAYLIST_ERROR: {
      return {
        ...state,
        isSettingDislikePlaylist: false,
        dislikePlaylistError: action.payload,
      };
    }
    case PlaylistTypes.DISLIKE_PLAYLIST_REQUEST: {
      return {
        ...state,
        isSettingDislikePlaylist: true,
      };
    }

    case PlaylistTypes.REMOVE_FROM_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isRemoving: false,
        removeSuccess: true,
        playlistInfo: action.payload,
        myPlaylists: updateListById(action.payload, [...state.myPlaylists]),
      };
    }
    case PlaylistTypes.REMOVE_FROM_PLAYLIST_REQUEST: {
      return {
        ...state,
        isRemoving: true,
        removeSuccess: false,
        removeError: null,
      };
    }
    case PlaylistTypes.REMOVE_FROM_PLAYLIST_ERROR: {
      return {
        ...state,
        isRemoving: false,
        removeSuccess: false,
        removeError: action.payload,
      };
    }
    case PlaylistTypes.REMOVE_FROM_PLAYLIST_RESET: {
      return {
        ...state,
        isRemoving: false,
        removeSuccess: false,
        removeError: null,
      };
    }
    case PlaylistTypes.GET_USER_PLAYLISTS_REQUEST: {
      return {
        ...state,
        isGettingUserPlaylists: true,
        getUserPlaylistsSuccess: false,
        getUserPlaylistsError: null,
      };
    }
    case PlaylistTypes.GET_USER_PLAYLISTS_ERROR: {
      return {
        ...state,
        isGettingUserPlaylists: false,
        getUserPlaylistsSuccess: false,
        getUserPlaylistsError: action.payload,
      };
    }
    case PlaylistTypes.GET_USER_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        isGettingUserPlaylists: false,
        getUserPlaylistsSuccess: true,
        getUserPlaylistsError: null,
        userPlaylists: action.payload,
      };
    }
    case PlaylistTypes.GET_USER_PLAYLISTS_RESET: {
      return {
        ...state,
        isGettingUserSongs: false,
        getUserSongsSuccess: false,
        getUserSongsError: null,
        userPlaylists: [],
      };
    }
    case PlaylistTypes.PLAYLIST_RESET: {
      return {
        ...state,
        myPlaylists: [],
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
        isGettingOnePlaylist: false,
        getOnePlaylistSuccess: false,
        getOnePlaylistError: null,
        isEditingPlaylist: false,
        editPlaylistSuccess: false,
        editPlaylistError: null,
        isDeletingPlaylist: false,
        deletePlaylistSuccess: false,
        deletePlaylistError: null,
        isSettingLikePlaylistPlaylist: false,
        likePlaylistError: null,
        isSettingDislikePlaylist: false,
        dislikePlaylistError: null,
        isRemoving: false,
        removeSuccess: false,
        removeError: null,

        isGettingUserPlaylists: false,
        getUserPlaylistsError: null,
        userPlaylists: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default PlaylistReducer;
