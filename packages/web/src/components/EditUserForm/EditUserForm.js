import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { userSelector } from "../../redux/user/user-selectors";
import { editUser } from "../../redux/user/user-actions";

import {
  PorfileImage,
  Input,
  Label,
  Form,
  CenterContent,
  Button,
  Error,
} from "../../styles/formStyles";

function EditUserForm() {
  const { currentUser, editUserError } = useSelector(userSelector);
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [porfileImage, setPorfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const formData = new FormData();

  useEffect(() => {
    if (currentUser.birthday) {
      setUser({ ...currentUser, birthday: currentUser.birthday.slice(0, 10) });
    } else {
      setUser(currentUser);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    if (porfileImage) {
      formData.append("porfileImage", porfileImage);
    }

    Object.keys(user).forEach((key) => {
      const notIncluded = ["porfileImage", "createdAt", "updatedAt"];
      if (notIncluded.indexOf(key) === -1) {
        formData.append(key, user[key]);
      }
    });

    dispatch(editUser(formData));
  }

  function handleSetUserName(e) {
    e.preventDefault();
    setUser({ ...user, userName: e.target.value });
  }

  function handleSetFirstName(e) {
    e.preventDefault();
    setUser({ ...user, firstName: e.target.value });
  }

  function handleSetLastName(e) {
    e.preventDefault();
    setUser({ ...user, lastName: e.target.value });
  }
  function handleSetBirthday(e) {
    e.preventDefault();
    setUser({ ...user, birthday: e.target.value.slice(0, 10) });
  }
  function handleSetPorfileImage(e) {
    e.preventDefault();
    setPorfileImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="porfileImage">
          <CenterContent>
            <PorfileImage
              src={
                previewImage ||
                user.porfileImage ||
                "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
              }
            />
          </CenterContent>
        </label>

        <Input
          type="file"
          id="porfileImage"
          className="form-input"
          accept="image/png, image/jpeg"
          onChange={handleSetPorfileImage}
          display="none"
        />
        <Label htmlFor="userName">User Name</Label>
        <Input
          type="text"
          id="userName"
          className="form-input"
          onChange={handleSetUserName}
          value={user.userName}
        />
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          className="form-input"
          onChange={handleSetFirstName}
          value={user.firstName}
        />
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          className="form-input"
          onChange={handleSetLastName}
          value={user.lastName}
        />
        <Label htmlFor="birthday">Birthday</Label>
        <Input
          type="date"
          id="birthday"
          className="form-input"
          onChange={handleSetBirthday}
          value={user.birthday}
        />
        <Button type="submit">Save</Button>
      </Form>
      {editUserError && <Error>Error: {editUserError}</Error>}
    </div>
  );
}

export default EditUserForm;
