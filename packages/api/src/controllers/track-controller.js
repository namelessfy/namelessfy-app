const { UserRepo, TrackRepo } = require("../repositories");
const {
  getAllById,
  editInfo,
  addFavorite,
  removeFavorite,
  getFavorite,
  deleteById,
} = require("./abstract-controller");

async function createTrack(req, res, next) {
  const {
    body: {
      title,
      url = null,
      thumbnail = null,
      duration = 0,
      genre = [],
      artistId = [],
      playlists = [],
      likedBy = [],
    },
    user: { uid },
  } = req;

  try {
    if (!title && !url) {
      res.status(400).send({
        data: null,
        error: "Missing Fields (title, url)",
      });
    }

    const user = await UserRepo.findOne({
      firebase_id: uid,
    });

    const response = await TrackRepo.create({
      title,
      url,
      thumbnail,
      duration,
      genre,
      authorId: user.data._id,
      artistId,
      playlists,
      likedBy,
    });

    if (response.error) {
      return res.status(500).send({
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
  } catch (error) {
    next(error);
  }
}

async function getTracks(req, res) {
  return await getAllById(req, res, TrackRepo);
}

async function editTrackInfo(req, res) {
  return await editInfo(req, res, TrackRepo);
}

async function addFavoriteTrack(req, res) {
  return await addFavorite(req, res, TrackRepo);
}

async function removeFavoriteTrack(req, res) {
  return await removeFavorite(req, res, TrackRepo);
}

async function getFavoriteTracks(req, res) {
  return await getFavorite(req, res, TrackRepo);
}

async function deleteTrack(req, res) {
  return await deleteById(req, res, TrackRepo);
}

module.exports = {
  createTrack,
  editTrackInfo,
  getTracks,
  addFavoriteTrack,
  removeFavoriteTrack,
  getFavoriteTracks,
  deleteTrack,
};
