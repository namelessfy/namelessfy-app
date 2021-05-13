import * as SearchTypes from "./search-types";

export const SearchInitialState = {
  isSearching: false,
  searchError: null,
  searchResults: {},
  searchingSuccess: false,
  searchInput: "",
  searchReference: null,
};

const SearchReducer = (state = SearchInitialState, action) => {
  switch (action.type) {
    case SearchTypes.SEARCH_REQUEST: {
      return {
        ...state,
        isSearching: true,
        searchError: null,
        searchingSuccess: false,
        searchResults: {},
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
    case SearchTypes.SET_SEARCH_INPUT: {
      return {
        ...state,
        searchInput: action.payload,
      };
    }
    case SearchTypes.SET_SEARCH_REFERENCE: {
      return {
        ...state,
        searchReference: action.payload,
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
        searchReference: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default SearchReducer;
