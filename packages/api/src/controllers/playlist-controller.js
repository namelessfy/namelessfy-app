const { UserRepo, PlaylistRepo } = require("../repositories");
const {
  getAllById,
  editInfo,
  addFavorite,
  removeFavorite,
  getFavorite,
  deleteById,
} = require("./abstract-controller");

const { uploadImageToCloudinary } = require("../utils/cloudinary");

async function createPlaylists(req, res, next) {
  let {
    body: {
      title,
      type,
      thumbnail = null,
      publicAccessible = true,
      tracks = [],
    },
    user: { uid },
  } = req;

  try {
    if (!title) {
      res.status(400).send({
        data: null,
        error: "Missing Field (title)",
      });
    }

    const user = await UserRepo.findOne({ firebase_id: uid });

    if (user.error) {
      res.status(400).send({
        data: null,
        error: user.error,
      });
    }

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.path,
        null,
        "playlistImages",
      );

      if (result.error) {
        return res.status(500).send({
          data: null,
          error: "Failed upload image to cloudinary",
        });
      }

      thumbnail = result.url;
      var cloudinaryThumbnailId = result.public_id;
    }

    const response = await PlaylistRepo.create({
      title,
      thumbnail,
      cloudinaryThumbnailId,
      type,
      publicAccessible,
      authorId: user.data._id,
      tracks,
    });

    if (response.error) {
      console.log(response.error);
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

async function getPlaylists(req, res) {
  return await getAllById(req, res, PlaylistRepo);
}

async function editPlaylistInfo(req, res) {
  return await editInfo(req, res, PlaylistRepo);
}

async function addFavoritePlaylist(req, res) {
  return await addFavorite(req, res, PlaylistRepo);
}

async function removeFavoritePlaylist(req, res) {
  return await removeFavorite(req, res, PlaylistRepo);
}

async function getFavoritePlaylist(req, res) {
  return await getFavorite(req, res, PlaylistRepo);
}

async function deletePlaylist(req, res) {
  return await deleteById(req, res, PlaylistRepo);
}

module.exports = {
  getPlaylists,
  createPlaylists,
  addFavoritePlaylist,
  removeFavoritePlaylist,
  getFavoritePlaylist,
  deletePlaylist,
  editPlaylistInfo,
};
