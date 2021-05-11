const {
  GENRE_COLLECTION,
  PLAYLIST_COLLECTION,
  TRACK_COLLECTION,
  USER_COLLECTION,
  CommonStaticRepository,
} = require("../repositories");

const RESULTS_LIMIT = 20;
const SERVER_ERROR_MESSAGE = "Something went wrong";
const NOT_FOUND_MESSAGE = "Not found";

function generateOptions(search, populators) {
  return {
    populators,
    query: {
      $text: {
        $search: search,
        $caseSensitive: false,
        $diacriticSensitive: true,
      },
    },
  };
}

function limitResults(results) {
  return results?.slice(0, RESULTS_LIMIT);
}

async function getByNameFromAllCollections(req, res, next) {
  try {
    const { search } = req.body;

    const genreOptions = generateOptions(search);
    const genres = await CommonStaticRepository.getAll(
      GENRE_COLLECTION,
      genreOptions,
    );

    const playlistsOptions = generateOptions(search);
    const playlists = await CommonStaticRepository.getAll(
      PLAYLIST_COLLECTION,
      playlistsOptions,
    );

    const tracksOptions = generateOptions(search);
    const tracks = await CommonStaticRepository.getAll(
      TRACK_COLLECTION,
      tracksOptions,
    );

    const userOptions = generateOptions(search);
    const users = await CommonStaticRepository.getAll(
      USER_COLLECTION,
      userOptions,
    );

    const noDataInAnyCollection =
      genres.error && playlists.error && tracks.error && users.error;

    if (noDataInAnyCollection) {
      return res.status(404).send({
        data: null,
        error: "No items found",
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
    const { search } = req.body;

    const trackOptions = generateOptions(search, ["likedBy"]);
    const track = await CommonStaticRepository.getAll(
      TRACK_COLLECTION,
      trackOptions,
    );

    if (track.error) {
      return res.status(503).send({ data: null, error: SERVER_ERROR_MESSAGE });
    }
    if (track.data.length === 0) {
      return res.status(404).send({ data: null, error: NOT_FOUND_MESSAGE });
    }

    const trackId = track?.data?._id;

    const playlists = await CommonStaticRepository.getAll(PLAYLIST_COLLECTION, {
      query: { tracks: trackId },
      populators: ["tracks"],
    });

    const genres = await CommonStaticRepository.getAll(GENRE_COLLECTION, {
      query: { tracks: trackId },
    });

    return res.status(200).send({
      data: {
        track: limitResults(track.data) || track.error,
        playlists: limitResults(playlists.data) || playlists.error,
        genres: limitResults(genres.data) || genres.error,
        users: limitResults(track.data.likedBy) || null,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllPlaylistReferences(req, res, next) {
  try {
    const { search } = req.body;

    const playlistOptions = generateOptions(search);
    const playlists = await CommonStaticRepository.getAll(
      PLAYLIST_COLLECTION,
      playlistOptions,
    );

    return res.status(200).send({
      data: {
        playlists: limitResults(playlists.data) || playlists.error,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllGenreReferences(req, res, next) {
  try {
    const { search } = req.body;

    const genreOptions = generateOptions(search, ["tracks"]);
    const genres = await CommonStaticRepository.getAll(
      GENRE_COLLECTION,
      genreOptions,
    );

    if (genres.error) {
      return res.status(503).send({ data: null, error: SERVER_ERROR_MESSAGE });
    }

    if (genres.data.length === 0) {
      return res.status(404).send({ data: null, error: NOT_FOUND_MESSAGE });
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

module.exports = {
  getByNameFromAllCollections,
  getAllTrackReferences,
  getAllPlaylistReferences,
  getAllGenreReferences,
};
