import { createSelector } from "reselect";

export const selectPlaylistState = (state) => state.playlist;

export const playlistSelector = createSelector(
  [selectPlaylistState],
  (playlist) => playlist,
);
