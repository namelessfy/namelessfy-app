import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Dropzone from "../../components/Dropzone";

import { uploadSong, uploadSongReset } from "../../redux/song/song-actions";
import { setUserView } from "../../redux/user/user-actions";
import { songSelector } from "../../redux/song/song-selectors";
import { userSelector } from "../../redux/user/user-selectors";

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
  AddInput,
} from "../../styles/formStyles";
import { Tag, TagList, CloseButton } from "./style";

import { Main } from "../../styles/mainStyles";
import Loader from "../../components/Loader";

function UploadSong() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    songSelector,
  );
  const { currentUser } = useSelector(userSelector);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [newArtist, setNewArtist] = useState("");
  const [artists, setArtists] = useState([
    { _id: currentUser._id, userName: currentUser.userName },
  ]);
  const [songImage, setSongImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [newStyle, setNewStyle] = useState("");
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    if (uploadSongSuccess) {
      dispatch(setUserView("song"));
      history.push(`${ROUTES.USER_PAGE}/${currentUser.userName}`);
      dispatch(uploadSongReset());
    }
  }, [uploadSongSuccess]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("artistId", JSON.stringify(artists));
    formData.append("genre", JSON.stringify(styles));

    if (songImage) {
      formData.append("songImage", songImage);
    }

    dispatch(
      uploadSong({
        track: file,
        formData: formData,
      }),
    );

    // eslint-disable-next-line spaced-comment
    /*setTitle("");
    setFile();*/
  }

  function handleSetTitle(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSetFile(uploadFile) {
    if (title === "") {
      setTitle(uploadFile.name);
    }
    setFile(uploadFile);
  }

  function handleSetCoverImage(e) {
    if (e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setSongImage(e.target.files[0]);
    }
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

  return (
    <Main marginBottom>
      {isUploadingSong && <Loader />}
      <Title>Upload Song</Title>
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
        <Dropzone
          onFileSelected={(files) => {
            // eslint-disable-next-line no-console
            handleSetFile(files[0]);
          }}
        />
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
              <Tag key={sty.path}>
                {sty}
                <CloseButton onClick={() => deleteStyle(index)} />
              </Tag>
            ))}
          </TagList>
        </div>
      </Form>
      <CenterContent>
        {isUploadingSong && <Error>Uploading song...</Error>}
        {uploadSongSuccess && file && <Error>Upload successful!</Error>}
        {uploadSongError && <Error>Upload error!</Error>}
        <Button
          type="submit"
          form="mainForm"
          disabled={isUploadingSong}
          lastItem
        >
          Upload
        </Button>
      </CenterContent>
    </Main>
  );
}

export default UploadSong;
