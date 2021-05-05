const { UserRepo, PlaylistRepo, TrackRepo } = require("../repositories");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
const { orderByLikedBy, handleResponse } = require("../utils/utils");
const {
  addFavorite,
  removeFavorite,
  getFavorite,
  deleteById,
} = require("./abstract-controller");

function isTitleMissing(res, title) {
  const errorMesage = "Missing Fields (title, url)";

  if (!title) {
    return res.status(400).send({ data: null, error: errorMesage });
  }
}

async function handleCloudinaryUpdateImage(
  res,
  file,
  cloudinaryThumbnailId = null,
) {
  if (file) {
    const result = await uploadImageToCloudinary(
      file.path,
      cloudinaryThumbnailId,
      "playlistImages",
    );

    if (result.error) {
      return handleResponse(
        res,
        result,
        null,
        503,
        null,
        "Failed upload image to cloudinary",
      );
    }

    return {
      thumbnail: result.url,
      cloudinaryThumbnailId: result.public_id,
    };
  }
}

async function create(req, res, next) {
  try {
    const { uid } = req.user;
    const { file } = req;
    let { title, type, publicAccessible = true, tracks = [] } = req.body;

    isTitleMissing(res, title);

    const user = await UserRepo.findOne({ firebase_id: uid });

    if (user.error) {
      return handleResponse(res, user, null, 503);
    }

    if (user.data.length <= 0) {
      return handleResponse(res, user, 404);
    }

    const {
      thumbnail,
      cloudinaryThumbnailId,
    } = await handleCloudinaryUpdateImage(file);
    const { _id } = user.data;

    const playlist = await PlaylistRepo.create({
      title,
      thumbnail,
      cloudinaryThumbnailId,
      type,
      publicAccessible,
      author: _id,
      likedBy: [{ _id, time: Date }],
      tracks,
    });

    return handleResponse(res, playlist, 201, 500);
  } catch (error) {
    next(error);
  }
}

async function getByIdAndPrivacy(req, res, next) {
  try {
    const { uid } = req.user;
    let { userId } = req.params;
    let query = {
      "likedBy._id": userId,
      publicAccessible: true,
      type: "Playlist",
    };

    if (userId === "me") {
      const user = await UserRepo.findOne({ firebase_id: uid });

      userId = user.data._id;

      query = {
        $or: [
          {
            publicAccessible: true,
            "likedBy._id": userId,
            type: "Playlist",
          },
          {
            publicAccessible: false,
            author: userId,
            type: "Playlist",
          },
        ],
      };
    }

    const playlists = PlaylistRepo.getAll(query);

    if (playlists.data) {
      playlists.data = playlists.data.sort((a, b) =>
        orderByLikedBy(a, b, userId),
      );
    }

    return handleResponse(res, playlists, 200, 503);
  } catch (error) {
    next(error);
  }
}

async function getFavorites(req, res, next) {
  return await getFavorite(req, res, PlaylistRepo, next);
}

async function patchFull(req, res, next) {
  try {
    const { id } = req.params;
    let {
      title,
      type,
      publicAccessible = true,
      tracks = [],
      cloudinaryThumbnailId = null,
      thumbnail = null,
    } = req.body;

    isTitleMissing(res, title);

    const cloudinaryUpdateResponse = await handleCloudinaryUpdateImage(
      res,
      req.file,
      cloudinaryThumbnailId,
    );

    if (!cloudinaryThumbnailId) {
      cloudinaryThumbnailId = cloudinaryUpdateResponse.cloudinaryThumbnailId;
    }

    thumbnail = cloudinaryUpdateResponse.thumbnail;

    const user = await UserRepo.findOne({ firebase_id: id });

    if (user.error) {
      return handleResponse(res, user, null, 400);
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

    return handleResponse(res, playlist, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function addToFavorite(req, res, next) {
  return await addFavorite(req, res, PlaylistRepo, next);
}

async function removeFromFavorite(req, res, next) {
  return await removeFavorite(req, res, PlaylistRepo, next);
}

async function addTrack(req, res, next) {
  try {
    const { title } = req.body;
    const { id } = req.params;

    const track = await TrackRepo.findOne({ title });

    if (track.error) {
      return handleResponse(res, track, null, 500);
    }

    const repo = await PlaylistRepo.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          tracks: {
            _id: track.data._id,
            time: new Date(),
          },
        },
      },
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function removeTrack(req, res, next) {
  try {
    const { title } = req.body;
    const { id } = req.params;

    const track = await TrackRepo.findOne({ title });

    if (track.error) {
      return handleResponse(res, track, null, 500);
    }

    const repo = await PlaylistRepo.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          tracks: {
            _id: track.data._id,
            time: new Date(),
          },
        },
      },
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function deletePlaylist(req, res) {
  return await deleteById(req, res, PlaylistRepo);
}

module.exports = {
  create,
  getByIdAndPrivacy,
  getFavorites,
  patchFull,
  addToFavorite,
  removeFromFavorite,
  addTrack,
  removeTrack,
  deletePlaylist,
};
