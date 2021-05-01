const { GenreRepo } = require("../repositories");
const { getByName, fetchAll } = require("./abstract-controller");

async function createGenre(req, res, next) {
  const {
    body: { name },
  } = req;

  try {
    if (!name) {
      return res.status(400).send({
        data: null,
        error: "Bad request: Missing genre name",
      });
    }

    const isDuplicatedGenre = await GenreRepo.getAll({ name });

    if (isDuplicatedGenre.data) {
      return res.status(409).send({
        data: null,
        error: "Genre already exists",
      });
    }

    const response = await GenreRepo.create({ name });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(201).send({
        data: response.data,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function getGenres(req, res) {
  if (req.body.name) {
    return getByName(req, res, GenreRepo);
  }

  return fetchAll(req, res, GenreRepo);
}

async function updateGenreByName(req, res) {
  const {
    body: data,
    params: { name },
  } = req;

  const genre = await Repository.findOneAndUpdate({ name }, data);

  if (genre.data) {
    return res.status(200).send({
      data: genre.data,
      error: null,
    });
  }

  if (genre.error) {
    return res.status(503).send({
      data: null,
      error: genre.error,
    });
  }
}

module.exports = {
  createGenre,
  getGenres,
  updateGenreByName,
};
