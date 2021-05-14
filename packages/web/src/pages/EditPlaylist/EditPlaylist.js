import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Loader from "../../components/Loader";

import * as ROUTES from "../../routes";

import {
  editPlaylist,
  setPlaylistInfo,
  editPlaylistReset,
  deletePlaylist,
  deletePlaylistReset,
} from "../../redux/playlist/playlist-actions";
import { setUserView } from "../../redux/user/user-actions";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";

import {
  Button,
  DeleteButton,
  Error,
  Form,
  Input,
  Label,
  Separation,
  Title,
  CoverImage,
  CenterContent,
} from "../../styles/formStyles";
import { Icon } from "../../styles/mainStyles";
import { PrivacityContainer } from "../CreatePlaylist/style";

function EditPlaylist() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isEditingPlaylist,
    editPlaylistSuccess,
    editPlaylistError,
    playlistInfo,
    isDeletingPlaylist,
    deletePlaylistSuccess,
  } = useSelector(playlistSelector);

  const [playlistImage, setPlaylistImage] = useState(
    playlistInfo?.thumbnail || "",
  );
  const [title, setTitle] = useState(playlistInfo?.title || "");
  const [previewImage, setPreviewImage] = useState(
    playlistInfo?.thumbnail || "",
  );
  const [isPublic, setisPublic] = useState(playlistInfo?.publicAccessible);

  useEffect(() => {
    if (editPlaylistSuccess) {
      dispatch(setPlaylistInfo(null));
      dispatch(setUserView("playlist"));
      dispatch(editPlaylistReset());
      history.goBack();
    }
  }, [editPlaylistSuccess]);

  useEffect(() => {
    if (deletePlaylistSuccess) {
      dispatch(deletePlaylistReset());
      history.push(ROUTES.HOME);
    }
  }, [deletePlaylistSuccess]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("publicAccessible", isPublic);
    formData.append("type", "Playlist");

    if (playlistImage) {
      formData.append("playlistImage", playlistImage);
    }

    dispatch(editPlaylist(formData, playlistInfo?._id));
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

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deletePlaylist(playlistInfo?._id));
  }

  return (
    <>
      {(isDeletingPlaylist || isEditingPlaylist) && <Loader />}
      <Title>Edit playlist {playlistInfo?.title}</Title>
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
        <Button type="submit" form="mainForm" disabled={isEditingPlaylist}>
          Edit
        </Button>
        <Form id="deleteBtn" onSubmit={handleDelete}>
          <DeleteButton
            type="submit"
            form="deleteBtn"
            disabled={isDeletingPlaylist}
            lastItem
          >
            Delete
          </DeleteButton>
        </Form>
      </CenterContent>
    </>
  );
}

export default EditPlaylist;
