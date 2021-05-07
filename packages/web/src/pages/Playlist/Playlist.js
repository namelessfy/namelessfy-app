import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Song from "../../components/Song";

import * as ROUTES from "../../routes";

import {
  SongsContainer,
  TitleContainer,
  Title,
  ToggleContainer,
  Separation,
  Thumbnail,
  Author,
  PlaylistInfo,
} from "./style";
import { Main, Icon } from "../../styles/mainStyles";

import {
  setAutoPlay,
  setQueueAndCurrentSong,
} from "../../redux/musicPlayer/player-actions";
import { startListByIndex } from "../../utils/playerUtils";
import { CenterContent } from "../../styles/formStyles";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { userSelector } from "../../redux/user/user-selectors";
import {
  dislikePlaylist,
  likePlaylist,
  removeFromPlaylist,
  setPlaylistInfo, // tenemos que eliminar este
  getOnePlaylist,
  getOnePlaylistReset,
} from "../../redux/playlist/playlist-actions";

import { deleteSongReset } from "../../redux/song/song-actions";
import { isIdInList } from "../../utils/favoritesUtils";
import { songSelector } from "../../redux/song/song-selectors";

function UploadSong() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { currentUser } = useSelector(userSelector);
  const { playlistInfo, myPlaylists, getOnePlaylistSuccess } = useSelector(
    playlistSelector,
  );
  const { deletingSuccess } = useSelector(songSelector);
  const [isGrid, setIsGrid] = useState(true);

  useEffect(() => {
    if (deletingSuccess) {
      dispatch(getOnePlaylist(id));
      dispatch(deleteSongReset());
    }
  }, [deletingSuccess]);

  useEffect(() => {
    dispatch(getOnePlaylist(id));
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(setPlaylistInfo(null));
    };
  }, []);

  useEffect(() => {
    if (getOnePlaylistSuccess) {
      dispatch(getOnePlaylistReset);
    }
  }, [getOnePlaylistSuccess]);

  function toggleGrid() {
    setIsGrid(!isGrid);
  }

  function handlePlaySong(index) {
    const song = playlistInfo?.tracks[index];

    const list = startListByIndex(index, [...playlistInfo?.tracks]);

    dispatch(setAutoPlay(true));
    dispatch(setQueueAndCurrentSong(song, list));
  }

  function editPlaylist() {
    dispatch(setPlaylistInfo(playlistInfo));
    history.push(ROUTES.EDIT_PLAYLIST);
  }

  function dislike() {
    dispatch(dislikePlaylist(playlistInfo?._id));
  }

  function like() {
    dispatch(likePlaylist(playlistInfo?._id));
  }

  function heartFunction() {
    return isIdInList(playlistInfo?._id, myPlaylists) ? (
      <Icon name="heartFull" size="small" onClick={dislike} />
    ) : (
      <Icon name="heartEmpty" size="small" onClick={like} />
    );
  }

  const removeSongFromPlaylist = (songId) =>
    currentUser._id === playlistInfo?.author
      ? {
          "Remove From Playlist": () => {
            dispatch(removeFromPlaylist(songId, playlistInfo?._id));
          },
        }
      : {};

  return (
    <Main marginBottom>
      <Navbar />
      <CenterContent>
        <Thumbnail src={playlistInfo?.thumbnail} />
      </CenterContent>
      <Author>
        by <a href="#">{playlistInfo?.authorName}</a>
      </Author>
      <PlaylistInfo>
        <div>
          <p>618 songs</p>
          <p>1854 minutes</p>
        </div>
        {playlistInfo?.author === currentUser._id ? (
          <Icon name="edit" size="small" onClick={editPlaylist} />
        ) : (
          heartFunction()
        )}
      </PlaylistInfo>
      <TitleContainer>
        <Title>{playlistInfo?.title}</Title>
        <ToggleContainer>
          <Icon
            name={isGrid ? "toggleOn" : "toggleOff"}
            size="normal"
            onClick={toggleGrid}
          />
          <Icon
            name={isGrid ? "grid" : "list"}
            size="normal"
            onClick={toggleGrid}
          />
        </ToggleContainer>
      </TitleContainer>
      <Separation />
      <SongsContainer>
        {playlistInfo?.tracks.map((song, index) => (
          <Song
            key={song._id}
            songInfo={song}
            handleClick={() => {
              handlePlaySong(index);
            }}
            contextFunctions={removeSongFromPlaylist(song._id)}
          />
        ))}
      </SongsContainer>
    </Main>
  );
}

export default UploadSong;
