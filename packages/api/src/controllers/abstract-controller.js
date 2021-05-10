const { USER_COLLECTION, CommonStaticRepository } = require("../repositories");
const {
  orderByLikedBy,
  orderSongs,
  handleResponse,
} = require("../utils/utils");

async function getAllById(req, res, collection, next) {
  try {
    const { uid } = req.user;

    if (req.params.userId === "me") {
      const options = {
        query: { firebase_id: uid },
        projection: "-__v",
      };
      const user = await CommonStaticRepository.getOne(
        USER_COLLECTION,
        options,
      );

      req.params.userId = user.data._id;
    }
    const repoOptions = {
      query: {
        "artistId._id": req.params.userId,
      },
    };
    const repo = await CommonStaticRepository.getAll(collection, repoOptions);

    if (repo.data) {
      repo.data.sort(orderSongs);
    }

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function fetchAll(req, res, collection, next) {
  try {
    const repo = await CommonStaticRepository.getAll(collection, {});

    return handleResponse(res, repo);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, collection, next) {
  try {
    const { id } = req;
    const options = {
      query: { id },
    };
    const repo = await CommonStaticRepository.getAll(collection, options);

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function getByName(req, res, collection, next) {
  try {
    const { name } = req;

    const options = {
      query: { name },
    };
    const repo = await CommonStaticRepository.getAll(collection, options);

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function getFavorite(req, res, collection, next) {
  try {
    const { uid } = req.user;
    let { id } = req.params;
    let firebase_id = uid;

    const userOptions = {
      query: { firebase_id },
      projection: "-__v",
    };
    const user = await CommonStaticRepository.getOne(
      USER_COLLECTION,
      userOptions,
    );

    id = id === "me" ? user.data._id : id;

    const options = {
      query: { "likedBy._id": id },
    };
    const repo = await CommonStaticRepository.getAll(collection, options);

    if (repo.data) {
      repo.data.sort((a, b) => orderByLikedBy(a, b, id));
    }

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function editInfo(req, res, collection, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    const options = {
      query: { _id: id },
      findOneAndUpdateOptions: data,
    };
    const repo = await CommonStaticRepository.findOneAndUpdate(
      collection,
      options,
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function addFavorite(req, res, collection, next) {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const options = {
      query: { firebase_id: uid },
      projection: "-__v",
    };
    const user = await CommonStaticRepository.getOne(USER_COLLECTION, options);

    if (user.error) {
      return handleResponse(res, user, null, 500);
    }

    const repoOptions = {
      query: { _id: id },
      findByIdAndUpdateOptions: {
        $addToSet: {
          likedBy: {
            _id: user.data._id,
            time: new Date(),
          },
        },
      },
    };

    const repo = await CommonStaticRepository.findOneAndUpdate(
      collection,
      repoOptions,
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function removeFavorite(req, res, collection, next) {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const options = {
      query: { firebase_id: uid },
      projection: "-__v",
    };

    const user = await CommonStaticRepository.getOne(USER_COLLECTION, options);

    if (user.error) {
      return handleResponse(res, user, null, 500);
    }

    const repoOptions = {
      query: { _id: id },
      findByIdAndUpdateOptions: {
        $pull: {
          likedBy: {
            _id: user.data._id,
          },
        },
      },
    };

    const repo = await CommonStaticRepository.findOneAndUpdate(
      collection,
      repoOptions,
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function deleteById(req, res, collection, next) {
  try {
    const repoOptions = {
      query: { _id: req.params.id },
    };

    const response = await CommonStaticRepository.findOneAndDelete(
      collection,
      repoOptions,
    );

    return handleResponse(res, response, 200, 400);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllById,
  getById,
  fetchAll,
  getByName,
  editInfo,
  addFavorite,
  removeFavorite,
  getFavorite,
  deleteById,
};
