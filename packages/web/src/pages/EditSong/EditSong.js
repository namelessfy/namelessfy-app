import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { songSelector } from "../../redux/song/song-selectors";
import {
  editSong,
  editSongReset,
  deleteSong,
  deleteSongReset,
} from "../../redux/song/song-actions";

import * as ROUTES from "../../routes";

import Navbar from "../../components/Navbar";

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
  AddInput,
} from "../../styles/formStyles";
import { Tag, TagList, CloseButton } from "../UploadSong/style";

import { Main } from "../../styles/mainStyles";
import { getSongFromList } from "../../utils/favoritesUtils";

function EditSong() {
  const history = useHistory();
  const {
    mySongs,
    isEditingSong,
    editSongError,
    editingSuccess,
    deletingSuccess,
  } = useSelector(songSelector);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [artists, setArtists] = useState([]);
  const [songImage, setSongImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [newStyle, setNewStyle] = useState("");
  const [styles, setStyles] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const song = getSongFromList(id, mySongs);
      setTitle(song.title);
      setThumbnail(song.thumbnail);
      setPreviewImage(song.thumbnail);
      setArtists(song.artistId);
    }
  }, [id]);

  useEffect(() => {
    if (editingSuccess) {
      dispatch(editSongReset());
      history.push(ROUTES.USER_PAGE);
    }
  }, [editingSuccess]);

  useEffect(() => {
    if (deletingSuccess) {
      dispatch(deleteSongReset());
      history.push(ROUTES.USER_PAGE);
    }
  }, [deletingSuccess]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("artistId", JSON.stringify(artists));
    formData.append("genre", JSON.stringify(styles));
    formData.append("thumbnail", thumbnail);

    if (songImage) {
      formData.append("songImage", songImage);
    }

    dispatch(editSong(formData, id));
  }

  function handleSetTitle(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSetSongImage(e) {
    e.preventDefault();
    setSongImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  function handleNewArtist(e) {
    e.preventDefault();
    setNewArtist(e.target.value);
  }

  function addArtist(e) {
    e.preventDefault();
    if (newArtist !== "" && artists.indexOf(newArtist) === -1) {
      setArtists([...artists, { _id: null, userName: newArtist }]);
      setNewArtist("");
    }
  }

  function deleteArtist(index) {
    const removed = [...artists];
    removed.splice(index, 1);
    setArtists(removed);
  }

  function handleNewStyle(e) {
    e.preventDefault();
    setNewStyle(e.target.value);
  }

  function addStyle(e) {
    e.preventDefault();
    if (newStyle !== "" && styles.indexOf(newStyle) === -1) {
      setStyles([...styles, newStyle]);
      setNewStyle("");
    }
  }

  function deleteStyle(index) {
    const removed = [...styles];
    removed.splice(index, 1);
    setStyles(removed);
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteSong(id));
  }

  return (
    <Main marginBottom>
      <Navbar />
      <Title>Edit Song</Title>
      <Separation />
      <Form onSubmit={handleSubmit} id="mainForm">
        <label htmlFor="songImage">
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
          id="songImage"
          className="form-input"
          accept="image/png, image/jpeg"
          onChange={handleSetSongImage}
          display="none"
        />
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" onChange={handleSetTitle} value={title} />
      </Form>

      <Separation />
      <Form onSubmit={addArtist}>
        <Label>Artists</Label>
        <AddInput>
          <input
            type="text"
            id="artist"
            value={newArtist}
            onChange={handleNewArtist}
            placeholder="Artist user name"
          />
          <Button type="button" onClick={addArtist}>
            Add
          </Button>
        </AddInput>

        <div>
          <TagList>
            {artists.map((art, index) => (
              <Tag key={art.userName}>
                {art.userName}
                <CloseButton onClick={() => deleteArtist(index)} />
              </Tag>
            ))}
          </TagList>
        </div>
      </Form>
      <Separation />
      <Form onSubmit={addStyle}>
        <Label>Styles</Label>
        <AddInput>
          <input
            type="text"
            id="styles"
            value={newStyle}
            onChange={handleNewStyle}
            placeholder="Style name"
          />
          <Button type="button" onClick={addStyle}>
            Add
          </Button>
        </AddInput>

        <div>
          <TagList>
            {styles.map((sty, index) => (
              <Tag key={sty}>
                {sty}
                <CloseButton onClick={() => deleteStyle(index)} />
              </Tag>
            ))}
          </TagList>
        </div>
      </Form>
      <CenterContent>
        {isEditingSong && <Error>Editing song...</Error>}
        {editingSuccess && <Error>Changed successfully!</Error>}
        {editSongError && <Error>Editing error!</Error>}
        <Button type="submit" form="mainForm">
          Save
        </Button>
        <Form id="deleteBtn" onSubmit={handleDelete}>
          <DeleteButton type="submit" form="deleteBtn" disabled={isEditingSong}>
            Delete
          </DeleteButton>
        </Form>
      </CenterContent>
    </Main>
  );
}

export default EditSong;
