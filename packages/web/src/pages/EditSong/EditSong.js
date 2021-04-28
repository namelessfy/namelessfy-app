import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { editSong } from "../../redux/song/song-actions";

import Navbar from "../../components/Navbar";

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
  AddInput,
} from "../../styles/formStyles";
import { Tag, TagList, CloseButton } from "../UploadSong/style";

import { Main } from "../../styles/mainStyles";

function EditSong() {
  const { currentUser, mySongs } = useSelector(userSelector);
  const { isEditingSong, editSongError } = useSelector(songSelector);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [artists, setArtists] = useState([currentUser.userName]);
  const [songImage, setSongImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [newStyle, setNewStyle] = useState("");
  const [styles, setStyles] = useState([]);

  const formData = new FormData();

  function handleSubmit(e) {
    e.preventDefault();

    formData.append("title", title);
    formData.append("artist", artists);
    formData.append("style", styles);

    if (songImage) {
      formData.append("songImage", songImage);
    }

    dispatch(editSong(formData));
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
      setArtists([...artists, newArtist]);
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

  return (
    <Main>
      <Navbar />
      <Title>Edit Song</Title>
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
              <Tag key={art}>
                {art}
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
        {/* {isEditingSong && <Error>Editing song...</Error>}
            {!editSongError && <Error>Changed successfully!</Error>}
            {editSongError && <Error>Editing error!</Error>} */}
        {editSongError && <Error>Error: {editSongError}</Error>}
        <Button type="submit" form="mainForm" disabled={isEditingSong} lastItem>
          Save
        </Button>
      </CenterContent>
    </Main>
  );
}

export default EditSong;
