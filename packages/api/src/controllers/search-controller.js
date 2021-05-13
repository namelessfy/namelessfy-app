const {
  GENRE_COLLECTION,
  PLAYLIST_COLLECTION,
  TRACK_COLLECTION,
  USER_COLLECTION,
  CommonStaticRepository,
} = require("../repositories");

const RESULTS_LIMIT = 20;
const SERVER_ERROR_MESSAGE = "Something went wrong";
/* const NOT_FOUND_MESSAGE = "Not found"; */

function generateOptions(search, populators, fields) {
  const regex = search.split(" ").join("|");
  return {
    populators,
    query: {
      $or: fields.map((el) => {
        const object = {};
        object[el] = { $regex: regex, $options: "i" };
        return object;
      }),
    },
  };
}

function limitResults(results) {
  return results?.slice(0, RESULTS_LIMIT);
}

async function getByNameFromAllCollections(req, res, next) {
  try {
    const { search } = req.params;

    const genreOptions = generateOptions(search, undefined, ["name"]);
    const genres = await CommonStaticRepository.getAll(
      GENRE_COLLECTION,
      genreOptions,
    );

    const playlistsOptions = generateOptions(search, undefined, ["title"]);
    const playlists = await CommonStaticRepository.getAll(
      PLAYLIST_COLLECTION,
      playlistsOptions,
    );

    const tracksOptions = generateOptions(search, undefined, ["title"]);
    const tracks = await CommonStaticRepository.getAll(
      TRACK_COLLECTION,
      tracksOptions,
    );

    const userOptions = generateOptions(search, undefined, [
      "firstName",
      "lastName",
      "userName",
    ]);
    const users = await CommonStaticRepository.getAll(
      USER_COLLECTION,
      userOptions,
    );

    const noDataInAnyCollection =
      genres.error && playlists.error && tracks.error && users.error;

    if (noDataInAnyCollection) {
      return res.status(200).send({
        data: {},
        message: null,
      });
    }
    return res.status(200).send({
      data: {
        genres: limitResults(genres.data) || genres.error,
        playlists: limitResults(playlists.data) || playlists.error,
        tracks: limitResults(tracks.data) || tracks.error,
        users: limitResults(users.data) || users.error,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllTrackReferences(req, res, next) {
  try {
    const { search } = req.params;

    const trackOptions = generateOptions(search, ["likedBy"], ["title"]);
    const tracks = await CommonStaticRepository.getAll(
      TRACK_COLLECTION,
      trackOptions,
    );

    if (tracks.error) {
      return res.status(503).send({ data: null, error: SERVER_ERROR_MESSAGE });
    }
    if (tracks.data.length === 0) {
      return res.status(200).send({ data: {}, error: null });
    }

    const trackId = tracks?.data?.map((el) => el._id);

    const playlists = await CommonStaticRepository.getAll(PLAYLIST_COLLECTION, {
      query: { tracks: { $in: trackId } },
      populators: ["tracks"],
    });

    let artistId = tracks?.data?.map((el) => {
      const artists = el.artistId.map((artist) => artist._id);
      return artists;
    });
    artistId = artistId.flat(Infinity);

    const users = await CommonStaticRepository.getAll(USER_COLLECTION, {
      query: { _id: { $in: artistId } },
    });

    const genres = await CommonStaticRepository.getAll(GENRE_COLLECTION, {
      query: { tracks: { $in: trackId } },
    });

    return res.status(200).send({
      data: {
        tracks: limitResults(tracks.data) || tracks.error,
        playlists: limitResults(playlists.data) || playlists.error,
        genres: limitResults(genres.data) || genres.error,
        users: limitResults(users.data) || users.error,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllPlaylistReferences(req, res, next) {
  try {
    const { search } = req.params;

    const playlistOptions = generateOptions(search, ["tracks"], ["title"]);
    const playlists = await CommonStaticRepository.getAll(
      PLAYLIST_COLLECTION,
      playlistOptions,
    );

    if (playlists.error) {
      return res.status(503).send({ data: null, error: SERVER_ERROR_MESSAGE });
    }
    if (playlists.data.length === 0) {
      return res.status(200).send({ data: {}, error: null });
    }

    const authors = playlists?.data?.map((el) => el.author);

    const users = await CommonStaticRepository.getAll(USER_COLLECTION, {
      query: { _id: { $in: authors } },
    });

    let tracks = playlists?.data?.map((el) => el.tracks);
    tracks = tracks.flat(Infinity);

    return res.status(200).send({
      data: {
        playlists: limitResults(playlists.data) || playlists.error,
        users: limitResults(users.data) || users.error,
        tracks: limitResults(tracks) || null,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllGenreReferences(req, res, next) {
  try {
    const { search } = req.params;

    const genreOptions = generateOptions(search, ["tracks"], ["name"]);
    const genres = await CommonStaticRepository.getAll(
      GENRE_COLLECTION,
      genreOptions,
    );

    if (genres.error) {
      return res.status(503).send({ data: null, error: SERVER_ERROR_MESSAGE });
    }

    if (genres.data.length === 0) {
      return res.status(200).send({ data: {}, error: null });
    }

    return res.status(200).send({
      data: {
        genres: limitResults(genres.data) || genres.error,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllUserReferences(req, res, next) {
  try {
    const { search } = req.params;

    const userOptions = generateOptions(search, undefined, [
      "firstName",
      "lastName",
      "userName",
    ]);
    const users = await CommonStaticRepository.getAll(
      USER_COLLECTION,
      userOptions,
    );

    if (users.error) {
      return res.status(503).send({ data: null, error: SERVER_ERROR_MESSAGE });
    }

    if (users.data.length === 0) {
      return res.status(200).send({ data: {}, error: null });
    }

    const ids = users?.data?.map((el) => el._id);

    const playlists = await CommonStaticRepository.getAll(PLAYLIST_COLLECTION, {
      query: { author: { $in: ids } },
    });

    const tracks = await CommonStaticRepository.getAll(TRACK_COLLECTION, {
      query: { "artistId._id": { $in: ids } },
    });

    return res.status(200).send({
      data: {
        users: limitResults(users.data) || users.error,
        playlists: limitResults(playlists.data) || playlists.error,
        tracks: limitResults(tracks.data) || tracks.error,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getByNameFromAllCollections,
  getAllTrackReferences,
  getAllPlaylistReferences,
  getAllGenreReferences,
  getAllUserReferences,
};
