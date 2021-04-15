import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";

function Home() {
  const { currentUser, signUpError } = useSelector(authSelector);

  const [email, setEmail] = useState(currentUser.email);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [birthday, setBirthday] = useState(currentUser.birthday);
  const [porfileImage, setPorfileImage] = useState(currentUser.porfileImage);
  const [previewImage, setPreviewImage] = useState(currentUser.porfileImage);

  function handleSubmit(e) {
    e.preventDefault();

  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleSetLastName(e) {
    setLastName(e.target.value);
  }
  function handleSetBirthday(e) {
    setBirthday(e.target.value);
  }
  function handleSetPorfileImage(e) {
    setPorfileImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <main className="p-4">
      <section className="p-4">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Complete Sign Up</h1>
          <hr className="my-4" />
          <div>
            <img
              src={
                previewImage ||
                "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
              }
            />
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-input"
              value={email}
              onChange={handleSetEmail}
            />
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="form-input"
              value={firstName}
              onChange={handleSetFirstName}
            />
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="form-input"
              value={lastName}
              onChange={handleSetLastName}
            />
            <label htmlFor="birthday" className="form-label">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              className="form-input"
              value={birthday}
              onChange={handleSetBirthday}
            />
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
