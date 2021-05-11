import * as SearchTypes from "./search-types";

export const SearchInitialState = {
  isSearching: false,
  searchError: null,
  searchResults: {},
  searchingSuccess: false,
  searchInput: "",
};

const SearchReducer = (state = SearchInitialState, action) => {
  switch (action.type) {
    case SearchTypes.SEARCH_REQUEST: {
      return {
        ...state,
        isSearching: true,
        searchError: null,
        searchingSuccess: false,
      };
    }
    case SearchTypes.SEARCH_ERROR: {
      return {
        ...state,
        isSearching: false,
        searchError: action.payload,
        searchingSuccess: false,
      };
    }
    case SearchTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        isSearching: false,
        searchError: null,
        searchResults: action.payload,
        searchingSuccess: true,
      };
    }
    case SearchTypes.SEARCH_RESET: {
      return {
        ...state,
        isSearching: false,
        searchError: null,
        searchResults: {},
        searchingSuccess: false,
        searchInput: "",
      };
    }
    case SearchTypes.SET_SEARCH_INPUT: {
      return {
        ...state,
        searchInput: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default SearchReducer;
