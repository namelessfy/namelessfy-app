import { createSelector } from "reselect";

export const selectUploaderState = (state) => state.uploader;

export const uploaderSelector = createSelector(
  [selectUploaderState],
  (uploader) => uploader,
);
