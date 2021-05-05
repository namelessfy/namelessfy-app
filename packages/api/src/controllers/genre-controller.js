const { GenreRepo, TrackRepo } = require("../repositories");
const { handleResponse } = require("../utils/utils");

function isNameMissing(res, name) {
  const noNameMessage = "Bad request: Missing genre name";

  if (!name) {
    return res.status(409).send({ data: null, error: noNameMessage });
  }
}

function trackValidation(res, trackName) {
  const track = TrackRepo.getAll({ title: trackName });

  if (track.error) {
    return handleResponse(res, track, null, 503);
  }

  if (track.data.length <= 0) {
    return handleResponse(res, track, 404, 503, "Track Not Found");
  }

  return track.data;
}

async function create(req, res, next) {
  const { name } = req.body;

  try {
    isNameMissing(res, name);

    const genreExist = await GenreRepo.getAll({ name });

    if (genreExist.data.length > 0) {
      return handleResponse(res, genreExist, 200, 500);
    }

    if (genreExist.error) {
      return handleResponse(res, genreExist, null, 503);
    }

    const response = await GenreRepo.create({ name });

    return handleResponse(res, response, 201, 400);
  } catch (error) {
    next(error);
  }
}

async function getByName(req, res, next) {
  const { name } = req.body;

  try {
    isNameMissing(res, name);

    const response = await GenreRepo.getAll({ name });

    return handleResponse(res, response, 200, 400);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const response = await GenreRepo.getAll();

    return handleResponse(res, response, 200, 400);
  } catch (error) {
    next(error);
  }
}

async function getByTrackName(req, res, next) {
  const { trackName } = req.body;

  try {
    isNameMissing(res, trackName);

    const validatedTrack = trackValidation(res, trackName);

    const response = await GenreRepo.getAll({ track: validatedTrack.data._id });

    return handleResponse(res, response, 200, 400);
  } catch (error) {
    next(error);
  }
}

async function updateTracksByName(req, res, next) {
  const { name, trackName } = req.body;

  try {
    isNameMissing(res, name);
    isNameMissing(res, trackName);

    const validatedTrack = trackValidation(res, trackName);
    const genre = await GenreRepo.getAll({ name });

    if (genre.error) {
      return handleResponse(res, genre, null, 503);
    }

    const { data } = genre;
    const tracks = data.tracks.concat(validatedTrack.data._id);

    const update = await GenreRepo.findOneAndUpdate(
      { id: genre.data._id },
      {
        ...data,
        popularity: tracks.length * 0.1,
        tracks,
      },
    );

    return handleResponse(res, update, 200, 400);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getByName,
  getAll,
  getByTrackName,
  updateTracksByName,
};
