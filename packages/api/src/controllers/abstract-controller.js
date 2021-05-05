const { UserRepo } = require("../repositories");
const {
  orderByLikedBy,
  orderSongs,
  handleResponse,
} = require("../utils/utils");

async function getAllById(req, res, Repository) {
  const { uid } = req.user;

  if (req.params.userId === "me") {
    const user = await UserRepo.findOne({ firebase_id: uid });

    req.params.userId = user.data._id;
  }

  try {
    const repo = await Repository.getAll({
      "artistId._id": req.params.userId,
    });

    if (repo.error) {
      return res.status(500).send({
        data: null,
        error: repo.error,
      });
    }

    if (repo.data) {
      repo.data.sort(orderSongs);
      return res.status(200).send({
        data: repo.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function fetchAll(req, res, Repository) {
  const repo = await Repository.getAll();

  try {
    if (repo.error) {
      return res.status(500).send({
        data: null,
        error: repo.error,
      });
    }

    if (repo.data) {
      return res.status(200).send({
        data: repo.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function getById(req, res, Repository) {
  const { id } = req;

  try {
    const repo = await Repository.getAll({ id });

    if (repo.error) {
      return res.status(500).send({
        data: null,
        error: repo.error,
      });
    }

    if (repo.data) {
      return res.status(200).send({
        data: repo.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function getByName(req, res, Repository) {
  const { name } = req;

  try {
    const repo = await Repository.getAll({ name });

    if (repo.error) {
      return res.status(500).send({
        data: null,
        error: repo.error,
      });
    }

    if (repo.data) {
      return res.status(200).send({
        data: repo.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function getFavorite(req, res, Repository, next) {
  try {
    const { uid } = req.user;

    if (req.params.userId === "me") {
      const user = await UserRepo.findOne({ firebase_id: uid });

      req.params.userId = user.data._id;
    }

    const repo = await Repository.getAll({ "likedBy._id": req.params.userId });

    if (repo.error) {
      return handleResponse(res, repo, null, 500);
    }

    if (repo.data) {
      repo.data.sort((a, b) => orderByLikedBy(a, b, req.params.userId));
    }

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}
async function editInfo(req, res, Repository) {
  const {
    body: data,
    params: { id },
  } = req;

  try {
    const repo = await Repository.findOneAndUpdate({ _id: id }, data);

    if (repo.error) {
      return res.status(500).send({
        data: null,
        error: repo.error,
      });
    }

    if (repo.data) {
      return res.status(200).send({
        data: repo.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
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

async function deleteById(req, res, Repository) {
  try {
    const response = await Repository.findOneAndDelete({ _id: req.params.id });

    return handleResponse(res, response, 200, 400);
  } catch (error) {
    return res.status(500).send({ error: error.message });
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
