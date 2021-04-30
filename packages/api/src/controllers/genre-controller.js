
const { GenreRepo } = require("../repositories");
const { getByName, getById, fetchAll } = require("./abstract-controller");
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

    const response = await GenreRepo.create({
      name: name,
    });

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

async function fetchAllGenres(req, res) {
  return fetchAll(req, res, GenreRepo);
}

async function fetchGenreByName(req, res) {
  return getByName(req, res, GenreRepo);
}

async function fetchGenreById(req, res) {
  return getById(req, res, GenreRepo);
}

module.exports = {
  createGenre,
  fetchAllGenres,
  fetchGenreById,
  fetchGenreByName,
};
