const { USER_COLLECTION, CommonStaticRepository } = require("../repositories");
const { handleResponse } = require("../utils/utils");
const { uploadImageToCloudinary } = require("../utils/cloudinary");

const { handleResponse } = require("../utils/utils");

async function signUp(req, res, next) {
  const { uid, email } = req.user;
  const options = {
    query: { email },
    projection: "-__v",
  };

  try {
    const response = await CommonStaticRepository.getOne(
      USER_COLLECTION,
      options,
    );

    if (response.error) {
      return handleResponse(res, response, null, 400);
    }

    if (response.data) {
      return handleResponse(res, response);
    }

    const position = email.indexOf("@");
    const randomNumber = Math.floor(Math.random() * 100);

    const userName = email.slice(0, position) + randomNumber;

    const createOptions = {
      query: {
        firebase_id: uid,
        email: email,
        userName: userName,
      },
    };

    await CommonStaticRepository.create(USER_COLLECTION, createOptions);

    return handleResponse(res, response, 201);
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res, next) {
  try {
    req.signOut();

    return res.status(200).send({
      data: "OK",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function edit(req, res, next) {
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
    const options = {
      query: { email },
      findByIdAndUpdateOptions: dataToUpdate,
      projection: "-__v",
    };

    const response = await CommonStaticRepository.findOneAndUpdate(
      USER_COLLECTION,
      options,
    );

    return handleResponse(res, response, null, 400);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  const { email } = req.user;

  try {
    const options = {
      query: { email },
    };
    const response = await CommonStaticRepository.findOneAndDelete(
      USER_COLLECTION,
      options,
    );

    return handleResponse(res, response, null, 400, "Delete user successfully");
  } catch (error) {
    next(error);
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

async function getUsersFollowing(req, res, next) {
  const { uid } = req.user;

  try {
    const users = await UserRepo.
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
  getUsersFollowing,
};
