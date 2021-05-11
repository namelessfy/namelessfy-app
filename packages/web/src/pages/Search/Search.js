import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Main } from "../../styles/mainStyles";

import Loader from "../../components/Loader";
import PlaylistPreview from "../../components/PlaylistPreview";
import PlaylistList from "../../components/PlaylistList";

import { setSearchInput, search } from "../../redux/search/search-actions";
import { searchSelector } from "../../redux/search/search-selectors";

function Search() {
  const dispatch = useDispatch();
  const {
    searchingSuccess,
    searchResults: { users, tracks, playlists, genres } = {},
    isSearching,
  } = useSelector(searchSelector);

  return (
    <Main marginBottom>
      {isSearching && <Loader />}
      {users?.length > 0 && <PlaylistList title="Users:" playlists={users} />}
      {tracks?.length > 0 && <PlaylistPreview title="Songs:" songs={tracks} />}
      {playlists?.length > 0 && (
        <PlaylistList title="Playlists:" playlists={playlists} />
      )}
    </Main>
  );
}

export default Search;
