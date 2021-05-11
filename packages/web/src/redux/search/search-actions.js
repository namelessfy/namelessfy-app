import * as SearchTypes from "./search-types";
import api from "../../api";
import * as auth from "../../services/auth";

export function search(text) {
  return async function searchThunk(dispatch) {
    dispatch(searchRequest());

    try {
      const userToken = await auth.getCurrentUserToken();

      if (!userToken) {
        return dispatch(searchError("User token null!"));
      }
      // const formData = new FormData();
      // formData.append('search', text);
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
