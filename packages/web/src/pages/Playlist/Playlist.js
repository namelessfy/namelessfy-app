import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

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
import { Icon } from "../../styles/mainStyles";

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
  getOnePlaylist,
  getOnePlaylistReset,
} from "../../redux/playlist/playlist-actions";

import { deleteSongReset } from "../../redux/song/song-actions";
import { isIdInList } from "../../utils/utils";
import { songSelector } from "../../redux/song/song-selectors";
import Loader from "../../components/Loader";

function UploadSong() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { currentUser } = useSelector(userSelector);
  const {
    playlistInfo,
    myPlaylists,
    isGettingOnePlaylist,
    getOnePlaylistSuccess,
  } = useSelector(playlistSelector);
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
    dispatch(setQueueAndCurrentSong(song, list, playlistInfo.title));
  }

  function editPlaylist() {
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
    <>
      {isGettingOnePlaylist && <Loader />}
      <CenterContent>
        <Thumbnail src={playlistInfo?.thumbnail} />
      </CenterContent>
      <Author>
        by{" "}
        <Link to={`${ROUTES.USER_PAGE}/${playlistInfo?.authorName}`}>
          {playlistInfo?.authorName}
        </Link>
      </Author>
      <PlaylistInfo>
        <div>
          <p>{playlistInfo?.tracks?.length || 0} songs</p>
          <p>
            {playlistInfo?.duration > 3600
              ? `${Math.floor(
                  playlistInfo?.duration / 3600,
                )} hours ${Math.floor(
                  (playlistInfo?.duration % 3600) / 60,
                )} minutes`
              : `${Math.floor(playlistInfo?.duration / 60) || 0} minutes`}{" "}
          </p>
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
            key={`${song._id}${Math.random()}`}
            songInfo={song}
            handleClick={() => {
              handlePlaySong(index);
            }}
            contextFunctions={removeSongFromPlaylist(song._id)}
          />
        ))}
      </SongsContainer>
    </>
  );
}

export default UploadSong;
