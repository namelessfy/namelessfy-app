import { createSelector } from "reselect";

export const selectSearchState = (state) => state.search;

export const searchSelector = createSelector(
  [selectSearchState],
  (search) => search,
);
