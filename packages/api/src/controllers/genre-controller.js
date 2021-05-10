const {
  GENRE_COLLECTION,
  TRACK_COLLECTION,
  CommonStaticRepository,
} = require("../repositories");
const { handleResponse } = require("../utils/utils");

function isNameMissing(res, name) {
  const noNameMessage = "Bad request: Missing genre name";

  if (!name) {
    return res.status(409).send({ data: null, error: noNameMessage });
  }
}

async function trackValidation(res, title) {
  const track = await CommonStaticRepository.getAll(TRACK_COLLECTION, {
    title,
  });

  if (track.error) {
    return handleResponse(res, track);
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

    const genre = await CommonStaticRepository.getAll(GENRE_COLLECTION, {
      name,
    });

    if (genre.data.length > 0) {
      return handleResponse(res, genre);
    }

    if (genre.error) {
      return handleResponse(res, genre);
    }

    const response = await CommonStaticRepository.create(GENRE_COLLECTION, {
      name,
    });

    return handleResponse(res, response, 201, 400);
  } catch (error) {
    next(error);
  }
}

async function getByName(req, res, next) {
  const { name } = req.body;

  try {
    isNameMissing(res, name);

    const genre = await CommonStaticRepository.getAll(GENRE_COLLECTION, {
      name,
    });

    return handleResponse(res, genre, 200, 400);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const genre = await CommonStaticRepository.getAll(GENRE_COLLECTION);

    return handleResponse(res, genre, 200, 400);
  } catch (error) {
    next(error);
  }
}

async function getByTrackName(req, res, next) {
  const { trackName } = req.body;

  try {
    isNameMissing(res, trackName);

    const validatedTrack = await trackValidation(res, trackName).data;
    const genreOptions = { track: validatedTrack.data._id };
    const genre = await CommonStaticRepository.getAll(
      GENRE_COLLECTION,
      genreOptions,
    );

    return handleResponse(res, genre, 200, 400);
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
    const genreOptions = { name };
    const genre = await CommonStaticRepository.getAll(
      GENRE_COLLECTION,
      genreOptions,
    );

    if (genre.error) {
      return handleResponse(res, genre);
    }

    const { data } = genre;
    const tracks = data.tracks.concat(validatedTrack.data._id);

    const update = await CommonStaticRepository.findOneAndUpdate(
      GENRE_COLLECTION,
      {
        id: genre.data._id,
      },
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
