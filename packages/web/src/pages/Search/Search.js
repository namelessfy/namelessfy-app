import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader";
import PlaylistPreview from "../../components/PlaylistPreview";
import PlaylistList from "../../components/PlaylistList";

import { search } from "../../redux/search/search-actions";
import { searchSelector } from "../../redux/search/search-selectors";

import { Container } from "./styles";

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
  }, [searchInput, dispatch, searchReference]);

  return (
    <>
      {isSearching && <Loader />}
      <Container>
        {searchReference === null && (
          <>
            {users?.length > 0 && (
              <PlaylistList title="Users:" playlists={users} />
            )}
            {playlists?.length > 0 && (
              <PlaylistList title="Playlists:" playlists={playlists} />
            )}
            {tracks?.length > 0 && (
              <PlaylistPreview title="Songs:" songs={tracks} />
            )}
          </>
        )}
        {searchReference === "user" && (
          <>
            {users?.length > 0 && (
              <PlaylistList title="Users:" playlists={users} />
            )}
            {tracks?.length > 0 && (
              <PlaylistPreview title="Songs:" songs={tracks} />
            )}
            {playlists?.length > 0 && (
              <PlaylistList title="Playlists:" playlists={playlists} />
            )}
          </>
        )}
        {searchReference === "track" && (
          <>
            {tracks?.length > 0 && (
              <PlaylistPreview title="Songs:" songs={tracks} />
            )}
            {users?.length > 0 && (
              <PlaylistList title="Users:" playlists={users} />
            )}
            {playlists?.length > 0 && (
              <PlaylistList title="Playlists:" playlists={playlists} />
            )}
          </>
        )}
        {searchReference === "playlist" && (
          <>
            {playlists?.length > 0 && (
              <PlaylistList title="Playlists:" playlists={playlists} />
            )}
            {users?.length > 0 && (
              <PlaylistList title="Users:" playlists={users} />
            )}
            {tracks?.length > 0 && (
              <PlaylistPreview title="Songs:" songs={tracks} />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default Search;
