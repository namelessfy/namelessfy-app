const { UserRepo, PlaylistRepo } = require("../repositories");
const {
  getAllById,
  editInfo,
  addFavorite,
  removeFavorite,
  getFavorite,
  deleteById,
} = require("./abstract-controller");

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
        error: "Missing Fields (title, url)",
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
        "playistImages",
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
      author: user.data._id,
      tracks,
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

async function getPlaylists(req, res) {
  if (req.user.uid) {
    return await getAllById(req, res, PlaylistRepo);
  }

  const allPublicPlaylistsPlaylists = await PlaylistRepo.getAll({
    publicAccessible: true,
  });

  if (allPublicPlaylistsPlaylists.data) {
    return res.status(200).send({
      data: allPublicPlaylistsPlaylists.data,
      error: null,
    });
  }

  return res.status(503).send({
    data: null,
    error: allPublicPlaylistsPlaylists.error,
  });
}

async function editPlaylistInfo(req, res) {
  let {
    body: {
      title,
      type,
      thumbnail = null,
      publicAccessible = true,
      tracks = [],
    },
    params: { id },
  } = req;

  try {
    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.path,
        cloudinaryThumbnailId,
        "playistImages",
      );

      if (result.error) {
        return res.status(500).send({
          data: null,
          error: "Failed upload image to cloudinary",
        });
      }

      thumbnail = result.url;

      if (!cloudinaryThumbnailId) {
        cloudinaryThumbnailId = result.public_id;
      }
    }

    const playlist = await PlaylistRepo.findOneAndUpdate(
      { _id: id },
      {
        title,
        thumbnail,
        cloudinaryThumbnailId,
        type,
        publicAccessible,
        author: user.data._id,
        tracks,
      },
    );

    if (playlist.error) {
      return res.status(500).send({
        data: null,
        error: playlist.error,
      });
    }

    if (playlist.data) {
      return res.status(200).send({
        data: playlist.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
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
