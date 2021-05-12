import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader";
import PlaylistPreview from "../../components/PlaylistPreview";
import PlaylistList from "../../components/PlaylistList";

import { search } from "../../redux/search/search-actions";
import { searchSelector } from "../../redux/search/search-selectors";

function Search() {
  const dispatch = useDispatch();
  const {
    searchInput,
    searchResults: { users, tracks, playlists } = {},
    isSearching,
    searchReference,
  } = useSelector(searchSelector);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(search(searchInput, searchReference));
    }, 200);

    return () => {
      clearTimeout(id);
    };
  }, [searchInput, dispatch]);

  return (
    <>
      {isSearching && <Loader />}
      {users?.length > 0 && <PlaylistList title="Users:" playlists={users} />}
      {tracks?.length > 0 && <PlaylistPreview title="Songs:" songs={tracks} />}
      {playlists?.length > 0 && (
        <PlaylistList title="Playlists:" playlists={playlists} />
      )}
    </>
  );
}

export default Search;
