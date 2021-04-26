import React, { useEffect, useState } from "react";
import { useSelector /* useDispatch */ } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { authSelector } from "../../redux/auth/auth-selectors";

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
  const { currentUser, editUserError } = useSelector(authSelector);
  /* const dispatch = useDispatch(); */

  const [user, setUser] = useState({});
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (currentUser.birthday) {
      setUser({ ...currentUser, birthday: currentUser.birthday.slice(0, 10) });
    } else {
      setUser(currentUser);
    }
  }, [currentUser]);

  <Formik
    initialValues={{
      porfileImage: "",
      userName: "",
      firstName: "",
      lastName: "",
      birthday: "",
    }}
    validationSchema={Yup.object().shape({
      userName: Yup.string()
        .userName("Invalid username")
        .min(3, "Username must contain at least 3 characters")
        .max(15, "Username must contain not more than 15 characters")
        .required("Username is a required"),
      firstName: Yup.string()
        .firstName("Invalid first name")
        .min(3, "First name must contain at least 3 characters")
        .max(15, "First name must contain not more than 15 characters")
        .required("First name is a required"),
      lastName: Yup.string()
        .lastName("Invalid last name")
        .min(3, "Last name must contain at least 3 characters")
        .max(15, "Last name must contain not more than 15 characters")
        .required("Last name is a required"),
      birthday: Yup.date
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
        console.log(values);
        setSubmitting(false);
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
    }) => {
      return (
        <>
          {JSON.stringify(errors, null, 2)}
          <Form
            onSubmit={() => {
              handleSubmit();
              isSubmitting(false);
            }}
          >
            <Label htmlFor="porfileImage">
              <CenterContent>
                <PorfileImage
                  src={
                    previewImage ||
                    user.porfileImage ||
                    "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"
                  }
                />
              </CenterContent>
            </Label>
            <Input
              type="file"
              id="porfileImage"
              name="porfileImage"
              /* accept="image/png, image/jpeg"
              display="none" */
              value={values.porfileImage}
              /* onChange={handleSetPorfileImage} */
              onChange={handleChange}
              onBlur={handleBlur}
              valid={touched.porfileImage && !errors.porfileImage}
              error={errors.porfileImage && touched.porfileImage && "error"}
            />
            {errors.porfileImage && touched.porfileImage && (
              <ErrorInput>{errors.porfileImage}</ErrorInput>
            )}

            <Label htmlFor="userName">Username</Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={touched.userName && !errors.userName}
              error={errors.userName && touched.userName && "error"}
            />
            {errors.userName && touched.userName && (
              <ErrorInput>{errors.userName}</ErrorInput>
            )}

            <Label htmlFor="firstName">First name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={touched.firstName && !errors.firstName}
              error={errors.firstName && touched.firstName && "error"}
            />
            {errors.firstName && touched.firstName && (
              <ErrorInput>{errors.firstName}</ErrorInput>
            )}

            <Label htmlFor="lastName">Last name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={touched.lastName && !errors.lastName}
              error={errors.lastName && touched.lastName && "error"}
            />
            {errors.lastName && touched.lastName && (
              <ErrorInput>{errors.lastName}</ErrorInput>
            )}

            <Label htmlFor="birthday">Birthday</Label>
            <Input
              type="date"
              id="birthday"
              name="birthday"
              value={values.birthday}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={touched.birthday && !errors.birthday}
              error={errors.birthday && touched.birthday && "error"}
            />
            {errors.birthday && touched.birthday && (
              <ErrorInput>{errors.birthday}</ErrorInput>
            )}

            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
            {editUserError && <Error>Error: {editUserError}</Error>}
          </Form>
        </>
      );
    }}
  </Formik>;
}

export default EditUserForm;
