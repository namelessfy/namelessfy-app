const { UserRepo } = require("../repositories");
const { uploadImageToCloudinary } = require("../utils/cloudinary");

const { handleResponse } = require("../utils/utils");

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UserRepo.findOne({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send(response.data);
    }

    const position = email.indexOf("@");
    const randomNumber = Math.floor(Math.random() * 100);

    const userName = email.slice(0, position) + randomNumber;

    await UserRepo.create({
      firebase_id: uid,
      email: email,
      userName: userName,
    });

    res.status(201).send({
      firebase_id: uid,
      email: email,
      userName: userName,
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: "OK",
    error: null,
  });
}

async function edit(req, res) {
  let dataToUpdate = {
    ...req.body,
  };
  delete dataToUpdate._id;
  delete dataToUpdate.firebase_id;

  if (req.file) {
    const result = await uploadImageToCloudinary(
      req.file.path,
      req.body._id,
      "porfileImages",
    );
    dataToUpdate.porfileImage = result.url;
  }

  const { email } = req.user;
  const updateFields = Object.keys(dataToUpdate);

  const allowedUpdates = [
    "firstName",
    "lastName",
    "email",
    "userName",
    "birthday",
    "porfileImage",
  ];
  const isValidUpdate = updateFields.every((property) =>
    allowedUpdates.includes(property),
  );

  if (!isValidUpdate) {
    res.status(400).send({
      error: "Invalid update request",
    });
  }

  try {
    const response = await UserRepo.findOneAndUpdate(
      { email: email },
      dataToUpdate,
    );

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send(response.data);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function remove(req, res) {
  const { email } = req.user;

  try {
    const response = await UserRepo.findOneAndDelete({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    res.status(200).send({
      data: "Delete user successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getByUsername(req, res, next) {
  const { userName } = req.params;

  try {
    const user = await UserRepo.findOne({ userName: userName });

    if (user.error) {
      return handleResponse(res, user, null, 500);
    }

    return handleResponse(res, user, 200, 500);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp,
  signOut,
  edit,
  delete: remove,
  getByUsername,
};
