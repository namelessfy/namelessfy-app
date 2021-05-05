import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";

import {
  editPlaylist,
  setPlaylistInfo,
  editPlaylistReset,
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
import { PrivacityContainer } from "../CreatePlaylist/style";

function EditPlaylist() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isEditingPlaylist,
    editPlaylistSuccess,
    editPlaylistError,
    playlistInfo,
  } = useSelector(playlistSelector);

  const [playlistImage, setPlaylistImage] = useState(
    playlistInfo.thumbnail || "",
  );
  const [title, setTitle] = useState(playlistInfo.title || "");
  const [previewImage, setPreviewImage] = useState(
    playlistInfo.thumbnail || "",
  );
  const [isPublic, setisPublic] = useState(playlistInfo.publicAccessible);

  useEffect(() => {
    if (editPlaylistSuccess) {
      dispatch(setPlaylistInfo(null));
      dispatch(setUserView("playlist"));
      history.push(ROUTES.USER_PAGE);
      dispatch(editPlaylistReset());
    }
  }, [editPlaylistSuccess]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("publicAccessible", isPublic);
    formData.append("type", "Playlist");

    if (playlistImage) {
      formData.append("playlistImage", playlistImage);
    }

    console.log(playlistInfo);
    dispatch(editPlaylist(formData, playlistInfo._id));
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
      <Title>Edit playlist {playlistInfo.title}</Title>
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
        {isEditingPlaylist && <Error>Editing playlist...</Error>}
        {editPlaylistSuccess && <Error>Edit playlist successful!</Error>}
        {editPlaylistError && <Error>{editPlaylistError}!</Error>}
        <Button
          type="submit"
          form="mainForm"
          disabled={isEditingPlaylist}
          lastItem
        >
          Edit
        </Button>
      </CenterContent>
    </Main>
  );
}

export default EditPlaylist;
