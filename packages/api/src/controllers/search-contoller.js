const {
  GENRE_COLLECTION,
  PLAYLIST_COLLECTION,
  TRACK_COLLECTION,
  USER_COLLECTION,
  CommonStaticRepository,
} = require("../repositories");

async function getByNameFromAllCollections(req, res, next) {
  try {
    const { search } = req.body;

    const genres = await CommonStaticRepository.getAll(GENRE_COLLECTION, {
      query: { name: search },
    });
    const playlists = await CommonStaticRepository.getAll(PLAYLIST_COLLECTION, {
      query: { title: search },
      populators: ["tracks"],
    });
    const tracks = await CommonStaticRepository.getAll(TRACK_COLLECTION, {
      query: { title: search },
    });
    const users = await CommonStaticRepository.getAll(USER_COLLECTION, {
      query: { userName: search },
    });

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
        genres: genres.data || genres.error,
        playlists: playlists.data || playlists.error,
        tracks: tracks.data || tracks.error,
        users: users.data || users.error,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getByNameFromAllCollections,
};
