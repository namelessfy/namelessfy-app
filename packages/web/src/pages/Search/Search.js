import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Main } from "../../styles/mainStyles";

import Loader from "../../components/Loader";

import { setSearchInput, search } from "../../redux/search/search-actions";
import { searchSelector } from "../../redux/search/search-selectors";

function Search() {
  const dispatch = useDispatch();
  const { searchingSuccess, searchResults, isSearching } = useSelector(
    searchSelector,
  );

  return (
    <Main marginBottom>
      {isSearching && <Loader />}
      {searchingSuccess &&
        searchResults?.users &&
        searchResults?.tracks &&
        searchResults?.playlists &&
        searchResults?.genres}
    </Main>
  );
}

export default Search;
