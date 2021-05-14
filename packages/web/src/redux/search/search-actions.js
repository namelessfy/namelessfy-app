import api from "../../api";

import * as auth from "../../services/auth";

import * as SearchTypes from "./search-types";

export function search(text, reference = null) {
  return async function searchThunk(dispatch) {
    dispatch(searchRequest());

    try {
      const userToken = await auth.getCurrentUserToken();

      if (!userToken) {
        return dispatch(searchError("User token null!"));
      }

      if (reference) {
        const searchRes = await api.searchByReference(
          {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          text,
          reference,
        );

        if (searchRes.errorMessage) {
          return dispatch(searchError(searchRes.errorMessage));
        }
        return dispatch(searchSuccess(searchRes.data.data));
      }

      const searchRes = await api.searchByTextInput(
        {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        text,
      );

      if (searchRes.errorMessage) {
        return dispatch(searchError(searchRes.errorMessage));
      }
      return dispatch(searchSuccess(searchRes.data.data));
    } catch (err) {
      return dispatch(searchError(err.message));
    }
  };
}

export const searchRequest = () => ({
  type: SearchTypes.SEARCH_REQUEST,
});

export const searchError = (message) => ({
  type: SearchTypes.SEARCH_ERROR,
  payload: message,
});

export const searchSuccess = (song) => ({
  type: SearchTypes.SEARCH_SUCCESS,
  payload: song,
});

export const searchReset = () => ({
  type: SearchTypes.SEARCH_RESET,
});

export const setSearchInput = (input) => ({
  type: SearchTypes.SET_SEARCH_INPUT,
  payload: input,
});

export const setSearchReference = (input) => ({
  type: SearchTypes.SET_SEARCH_REFERENCE,
  payload: input,
});
