import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";

import {
  createPlaylist,
  createPlaylistReset,
  setCacheSongId,
} from "../../redux/playlist/playlist-actions";
import { setUserView } from "../../redux/user/user-actions";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";

import * as ROUTES from "../../routes";

import {
  Button,
  Error,
  Form,
  Input,
  Label,
  Separation,
  Title,
  CoverImage,
  CenterContent,
} from "../../styles/formStyles";

import { Main, Icon } from "../../styles/mainStyles";
import { PrivacityContainer } from "./style";

function CreatePlaylist() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isCreatingPlaylist,
    createPlaylistSuccess,
    createPlaylistError,
    cacheSongId,
  } = useSelector(playlistSelector);

  const [title, setTitle] = useState("");
  const [playlistImage, setPlaylistImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isPublic, setisPublic] = useState("true");

  useEffect(() => {
    if (createPlaylistSuccess) {
      dispatch(setCacheSongId(null));
      dispatch(setUserView("playlist"));
      dispatch(createPlaylistReset());
      history.push(ROUTES.USER_PAGE);
    }
  }, [createPlaylistSuccess]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("publicAccessible", isPublic);
    formData.append("type", "Playlist");

    if (playlistImage) {
      formData.append("playlistImage", playlistImage);
    }

    if (cacheSongId) {
      formData.append("tracks", JSON.stringify([cacheSongId]));
    }

    dispatch(createPlaylist(formData));
  }

  function handleSetTitle(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSetCoverImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setPlaylistImage(e.target.files[0]);
  }

  function handlePrivacityChange(e) {
    e.preventDefault();
    setisPublic(!isPublic);
  }

  return (
    <Main>
      <Navbar />
      <Title>Create playlist</Title>
      <Separation />
      <Form onSubmit={handleSubmit} id="mainForm">
        <label htmlFor="coverImage">
          <CenterContent>
            <CoverImage
              src={
                previewImage ||
                "https://i.pinimg.com/originals/ee/87/15/ee871547fa4b959307a8776cd61aad6d.jpg"
              }
            />
          </CenterContent>
        </label>

        <Input
          type="file"
          id="coverImage"
          className="form-input"
          accept="image/png, image/jpeg"
          onChange={handleSetCoverImage}
          display="none"
        />
        <Label>Title</Label>
        <Input type="text" id="title" value={title} onChange={handleSetTitle} />
        <PrivacityContainer>
          <Icon
            onClick={handlePrivacityChange}
            name={isPublic ? "toggleOn" : "toggleOff"}
            size="small"
          />
          <span>{isPublic ? "Public" : "Private"}</span>
        </PrivacityContainer>
      </Form>
      <Separation />
      <CenterContent>
        {isCreatingPlaylist && <Error>Creating playlist...</Error>}
        {createPlaylistSuccess && <Error>Create playlist successful!</Error>}
        {createPlaylistError && <Error>{createPlaylistError}!</Error>}
        <Button
          type="submit"
          form="mainForm"
          disabled={isCreatingPlaylist}
          lastItem
        >
          Create
        </Button>
      </CenterContent>
    </Main>
  );
}

export default CreatePlaylist;
