import { createSelector } from "reselect";

export const selectUserState = (state) => state.user;

export const userSelector = createSelector([selectUserState], (user) => user);
