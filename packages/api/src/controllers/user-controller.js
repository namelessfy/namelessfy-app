const { USER_COLLECTION, CommonStaticRepository } = require("../repositories");
const { handleResponse } = require("../utils/utils");
const { uploadImageToCloudinary } = require("../utils/cloudinary");

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

    const user = await CommonStaticRepository.create(
      USER_COLLECTION,
      createOptions,
    );

    return handleResponse(res, user, 201, 500);
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
  const { uid, email } = req.user;
  let dataToUpdate = {
    ...req.body,
  };
  dataToUpdate.email = email;

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
    const userOptions = {
      query: { firebase_id: uid },
      projection: "-__v",
    };
    const user = await CommonStaticRepository.getOne(
      USER_COLLECTION,
      userOptions,
    );
    if (user.error) {
      return handleResponse(res, user, null, 500);
    }
    const options = {
      query: { _id: user.data._id },
      findByIdAndUpdateOptions: dataToUpdate,
    };

    const response = await CommonStaticRepository.findOneAndUpdate(
      USER_COLLECTION,
      options,
    );
    return handleResponse(res, response, 200, 500);
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
    const options = {
      query: { userName: userName },
      projection: "-__v",
    };
    const user = await CommonStaticRepository.getOne(USER_COLLECTION, options);

    if (user.error) {
      return handleResponse(res, user, null, 500);
    }

    return handleResponse(res, user, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function getUsersFollowing(req, res, next) {
  let { id } = req.params;
  const { uid } = req.user;

  try {
    if (id === "me") {
      const userOptions = {
        query: { firebase_id: uid },
        projection: "-__v",
      };
      const user = await CommonStaticRepository.getOne(
        USER_COLLECTION,
        userOptions,
      );
      if (user.error) {
        return handleResponse(res, user, null, 500);
      }
      id = user._id;
    }

    const options = {
      query: { followedBy: id },
      projection: "-__v",
    };
    const followingUser = await CommonStaticRepository.getAll(
      USER_COLLECTION,
      options,
    );
    if (followingUser.error) {
      return handleResponse(res, followingUser, null, 500);
    }
    return handleResponse(res, followingUser, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function followUser(req, res, next) {
  let { id } = req.params;
  const { uid } = req.user;

  try {
    const userOptions = {
      query: { firebase_id: uid },
      projection: "-__v",
    };
    const user = await CommonStaticRepository.getOne(
      USER_COLLECTION,
      userOptions,
    );
    if (user.error) {
      return handleResponse(res, user, null, 500);
    }

    const options = {
      query: { _id: id },
      projection: "-__v",
      findByIdAndUpdateOptions: {
        $addToSet: {
          followedBy: user.data._id,
        },
      },
    };
    const result = await CommonStaticRepository.findOneAndUpdate(
      USER_COLLECTION,
      options,
    );
    if (result.error) {
      return handleResponse(res, result, null, 500);
    }
    return handleResponse(res, result, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function unfollowUser(req, res, next) {
  let { id } = req.params;
  const { uid } = req.user;

  try {
    const userOptions = {
      query: { firebase_id: uid },
      projection: "-__v",
    };
    const user = await CommonStaticRepository.getOne(
      USER_COLLECTION,
      userOptions,
    );
    if (user.error) {
      return handleResponse(res, user, null, 500);
    }

    const options = {
      query: { _id: id },
      projection: "-__v",
      findByIdAndUpdateOptions: {
        $pull: {
          followedBy: user.data._id,
        },
      },
    };
    const result = await CommonStaticRepository.findOneAndUpdate(
      USER_COLLECTION,
      options,
    );
    if (result.error) {
      return handleResponse(res, result, null, 500);
    }
    return handleResponse(res, result, 200, 500);
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
  followUser,
  unfollowUser,
};
