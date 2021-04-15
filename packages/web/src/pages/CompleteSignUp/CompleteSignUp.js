import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";

import { editUser } from "../../redux/auth/auth-actions";

function Home() {
  const { currentUser, signUpError } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState("");

  const formData = new FormData();

  function handleSubmit(e) {
    e.preventDefault();

    
    formData.append("email", currentUser.email);

    dispatch(editUser(formData));
  }

  function handleSetUserName(e) {
    formData.append("userName", e.target.value);
  }

  function handleSetFirstName(e) {
    formData.append("firstName", e.target.value);
  }

  function handleSetLastName(e) {
    formData.append("lastName", e.target.value);
  }
  function handleSetBirthday(e) {
    formData.append("birthday", e.target.value);
  }
  function handleSetPorfileImage(e) {
    formData.append("porfileImage", e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <main className="p-4">
      <section className="p-4">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Complete Sign Up</h1>
          <hr className="my-4" />
          <form onSubmit={handleSubmit}>
            <div>
              <img
                src={
                  previewImage ||
                  "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
                }
              />
            </div>
            <label htmlFor="porfileImage" className="form-label">
              Porfile Image
            </label>
            <input
              type="file"
              id="porfileImage"
              className="form-input"
              accept="image/png, image/jpeg"
              onChange={handleSetPorfileImage}
            />
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              className="form-input"
              onChange={handleSetUserName}
            />
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="form-input"
              onChange={handleSetFirstName}
            />
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="form-input"
              onChange={handleSetLastName}
            />
            <label htmlFor="birthday" className="form-label">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              className="form-input"
              onChange={handleSetBirthday}
            />
            <button className="btn btn-primary w-full" type="submit">
              Sign Up
            </button>
          </form>
          {signUpError && <section className="mt-4">{signUpError}</section>}
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
          </section>
        </section>
      </section>
    </main>
  );
}

export default Home;
