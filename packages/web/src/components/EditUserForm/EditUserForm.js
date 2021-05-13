import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Loader from "../Loader";

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
  ErrorInput,
} from "../../styles/formStyles";

function EditUserForm() {
  const { currentUser, editUserError, isEditingUser } = useSelector(
    userSelector,
  );
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const formData = new FormData();

  function handleEditInfoUser(userName, firstName, lastName, birthday) {
    if (profileImage) {
      formData.append("porfileImage", profileImage);
    }

    formData.append("userName", userName);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthday", birthday);

    formData.append("email", currentUser.email);

    dispatch(editUser(formData));
  }

  function handleSubmitImage(e) {
    e.preventDefault();
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setProfileImage(e.target.files[0]);
  }

  return (
    <>
      {isEditingUser && <Loader />}
      <Formik
        initialValues={{
          userName: currentUser.userName,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          birthday: currentUser.birthday,
        }}
        validationSchema={Yup.object().shape({
          userName: Yup.string()
            .min(3, "Username must contain at least 3 characters")
            .max(15, "Username must contain not more than 15 characters")
            .required("Username is a required"),
          firstName: Yup.string()
            .min(3, "First name must contain at least 3 characters")
            .max(15, "First name must contain not more than 15 characters")
            .required("First name is a required"),
          lastName: Yup.string()
            .min(3, "Last name must contain at least 3 characters")
            .max(15, "Last name must contain not more than 15 characters")
            .required("Last name is a required"),
          birthday: Yup.date()
            .required("Birthday is a required")
            .test(
              "age",
              "You must be 18 or older",
              function validateBirthday(birthday) {
                const cutoff = new Date();
                cutoff.setFullYear(cutoff.getFullYear() - 18);
                return birthday <= cutoff;
              },
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            handleEditInfoUser(
              values.userName,
              values.firstName,
              values.lastName,
              values.birthday,
            );
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="porfileImage">
              <CenterContent>
                <PorfileImage
                  src={
                    previewImage ||
                    currentUser.porfileImage ||
                    "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
                  }
                />
              </CenterContent>
            </Label>
            <Input
              type="file"
              id="porfileImage"
              name="porfileImage"
              accept="image/png, image/jpeg"
              display="none"
              onChange={handleSubmitImage}
              onBlur={handleBlur}
              valid={touched.porfileImage && !errors.porfileImage}
              error={errors.porfileImage && touched.porfileImage && "error"}
            />
            <Label htmlFor="userName"> Username </Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              value={values.userName ? values.userName : ""}
              onChange={(e) => {
                e.preventDefault();
                handleChange(e);
              }}
              onBlur={handleBlur}
              valid={touched.userName && !errors.userName}
              error={errors.userName && touched.userName && "error"}
            />
            {errors.userName && touched.userName && (
              <ErrorInput> {errors.userName} </ErrorInput>
            )}
            <Label htmlFor="firstName"> First name </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName ? values.firstName : ""}
              onChange={(e) => {
                e.preventDefault();
                handleChange(e);
              }}
              onBlur={handleBlur}
              valid={touched.firstName && !errors.firstName}
              error={errors.firstName && touched.firstName && "error"}
            />
            {errors.firstName && touched.firstName && (
              <ErrorInput> {errors.firstName} </ErrorInput>
            )}
            <Label htmlFor="lastName"> Last name </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName ? values.lastName : ""}
              onChange={(e) => {
                e.preventDefault();
                handleChange(e);
              }}
              onBlur={handleBlur}
              valid={touched.lastName && !errors.lastName}
              error={errors.lastName && touched.lastName && "error"}
            />
            {errors.lastName && touched.lastName && (
              <ErrorInput> {errors.lastName} </ErrorInput>
            )}
            <Label htmlFor="birthday"> Birthday </Label>
            <Input
              type="date"
              id="birthday"
              name="birthday"
              value={values.birthday ? values.birthday.slice(0, 10) : ""}
              onChange={(e) => {
                e.preventDefault();
                handleChange(e);
              }}
              onBlur={handleBlur}
              valid={touched.birthday && !errors.birthday}
              error={errors.birthday && touched.birthday && "error"}
            />
            {errors.birthday && touched.birthday && (
              <ErrorInput> {errors.birthday} </ErrorInput>
            )}
            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
            {editUserError && <Error> Error: {editUserError} </Error>}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditUserForm;
