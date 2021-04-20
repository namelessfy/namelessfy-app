const { UserRepo } = require("../repositories");
const { uploadImageToCloudinary } = require("../utils/cloudinary");

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

    await UserRepo.create({
      _id: uid,
      email: email,
      username: uid,
    });

    res.status(201).send({
      _id: uid,
      email: email,
      username: uid,
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

  if (req.file) {
    const result = await uploadImageToCloudinary(req.file.path, req.body._id);
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

module.exports = {
  signUp: signUp,
  signOut: signOut,
  edit: edit,
  delete: remove,
};
