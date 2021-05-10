const { UserRepo } = require("../repositories");
const {
  orderByLikedBy,
  orderSongs,
  handleResponse,
} = require("../utils/utils");

async function getAllById(req, res, Repository, next) {
  try {
    const { uid } = req.user;

    if (req.params.userId === "me") {
      const user = await UserRepo.findOne({ firebase_id: uid });

      req.params.userId = user.data._id;
    }

    const repo = await Repository.getAll({
      "artistId._id": req.params.userId,
    });

    if (repo.data) {
      repo.data.sort(orderSongs);
    }

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function fetchAll(req, res, Repository, next) {
  try {
    const repo = await Repository.getAll();

    return handleResponse(res, repo);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, Repository, next) {
  try {
    const { id } = req;

    const repo = await Repository.getAll({ id });

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function getByName(req, res, Repository, next) {
  try {
    const { name } = req;

    const repo = await Repository.getAll({ name });

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function getFavorite(req, res, Repository, next) {
  try {
    const { uid } = req.user;
    let { id } = req.params;
    let firebase_id = uid;

    const user = await UserRepo.findOne({ firebase_id });

    id = id === "me" ? user.data._id : id;

    const repo = await Repository.getAll({ "likedBy._id": id });

    if (repo.error) {
      return handleResponse(res, repo, null, 500);
    }

    if (repo.data) {
      repo.data.sort((a, b) => orderByLikedBy(a, b, id));
    }

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function editInfo(req, res, Repository, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const repo = await Repository.findOneAndUpdate({ _id: id }, data);

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function addFavorite(req, res, Repository, next) {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await UserRepo.findOne({ firebase_id: uid });

    if (user.error) {
      return handleResponse(res, user, null, 500);
    }

    const repo = await Repository.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          likedBy: {
            _id: user.data._id,
            time: new Date(),
          },
        },
      },
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function removeFavorite(req, res, Repository, next) {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await UserRepo.findOne({ firebase_id: uid });

    if (user.error) {
      return handleResponse(res, user, null, 500);
    }

    const repo = await Repository.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          likedBy: {
            _id: user.data._id,
          },
        },
      },
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function deleteById(req, res, Repository, next) {
  try {
    const response = await Repository.findOneAndDelete({ _id: req.params.id });

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
