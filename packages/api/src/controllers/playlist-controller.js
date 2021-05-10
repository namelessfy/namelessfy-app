const {
  PLAYLIST_COLLECTION,
  USER_COLLECTION,
  CommonStaticRepository,
} = require("../repositories");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
const { handleResponse } = require("../utils/utils");
const {
  addFavorite,
  removeFavorite,
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
  return {
    thumbnail: null,
    cloudinaryThumbnailId: null,
  };
}

async function create(req, res, next) {
  try {
    const { uid } = req.user;
    const { file } = req;
    let { title, type, publicAccessible = true, tracks = [] } = req.body;

    isTitleMissing(res, title);
    if (tracks.length > 0) {
      tracks = JSON.parse(tracks);
      tracks = tracks.map((el) => ({ _id: el, time: new Date() }));
    }

    const userOptions = {
      query: { firebase_id: uid },
      projection: "-__v",
    };

    const user = await CommonStaticRepository.getOne(
      USER_COLLECTION,
      userOptions,
    );

    if (user.error) {
      return handleResponse(res, user, null, 503);
    }

    if (user.data.length <= 0) {
      return handleResponse(res, user, 404);
    }

    const {
      thumbnail,
      cloudinaryThumbnailId,
    } = await handleCloudinaryUpdateImage(res, file);

    const playlistCreateOptions = {
      query: {
        title,
        thumbnail,
        cloudinaryThumbnailId,
        type,
        publicAccessible,
        authorName: user.data.userName,
        author: user.data._id,
        likedBy: [
          {
            _id: user.data._id,
            time: new Date(),
          },
        ],
        tracks,
      },
    };

    await CommonStaticRepository.create(
      PLAYLIST_COLLECTION,
      playlistCreateOptions,
    );

    const playlistOptions = {
      query: { _id: playlist.data._id },
      populators: ["tracks"],
    };

    const playlist = await CommonStaticRepository.getOne(
      PLAYLIST_COLLECTION,
      playlistOptions,
    );

    return handleResponse(res, playlist, 201);
  } catch (error) {
    next(error);
  }
}

async function getFavoritePlaylists(req, res, next) {
  try {
    const { uid } = req.user;
    let { id } = req.params;
    let firebase_id = id === "me" ? uid : id;

    const userOptions = {
      query: { firebase_id },
      projection: "-__v",
    };

    const user = await CommonStaticRepository.getOne(
      USER_COLLECTION,
      userOptions,
    );

    id = user.data._id;

    let defaultQuery = {
      "likedBy._id": id,
      publicAccessible: true,
      type: "Playlist",
    };

    let meQuery = {
      $or: [
        defaultQuery,
        {
          author: id,
          publicAccessible: false,
          type: "Playlist",
        },
      ],
    };

    const playlistOptions = {
      query: id === "me" ? meQuery : defaultQuery,
    };
    const playlists = await CommonStaticRepository.getAll(
      PLAYLIST_COLLECTION,
      playlistOptions,
    );

    return handleResponse(res, playlists, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function getOnePlaylist(req, res, next) {
  try {
    const { uid } = req.user;
    let { playlistId } = req.params;

    const userOptions = {
      query: { firebase_id: uid },
      projection: "-__v",
    };

    const user = await CommonStaticRepository.getOne(
      USER_COLLECTION,
      userOptions,
    );
    const playlistOptions = {
      query: {
        $or: [
          {
            publicAccessible: true,
            _id: playlistId,
          },
          {
            author: user.data._id,
            _id: playlistId,
          },
        ],
      },
      populators: ["tracks"],
    };
    const playlist = await CommonStaticRepository.getOne(
      PLAYLIST_COLLECTION,
      playlistOptions,
    );

    return handleResponse(res, playlist, 200, 503);
  } catch (error) {
    next(error);
  }
}

async function editPlaylistInfo(req, res, next) {
  try {
    const { id } = req.params;
    let {
      title,
      publicAccessible = true,
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

    const playlistOptions = {
      query: { _id: id },
      findByIdAndUpdateOptions: thumbnail
        ? { title, thumbnail, cloudinaryThumbnailId, publicAccessible }
        : { title, publicAccessible },
    };
    const playlist = await CommonStaticRepository.findOneAndUpdate(
      PLAYLIST_COLLECTION,
      playlistOptions,
    );

    return handleResponse(res, playlist, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function addToFavorite(req, res, next) {
  return await addFavorite(req, res, PLAYLIST_COLLECTION, next);
}

async function removeFromFavorite(req, res, next) {
  return await removeFavorite(req, res, PLAYLIST_COLLECTION, next);
}

async function removeTrack(req, res, next) {
  try {
    const { _id } = req.body;
    const { id } = req.params;

    const playlistCreateOptions = {
      query: { _id: id },
      findByIdAndUpdateOptions: {
        $pull: {
          tracks: _id,
        },
      },
    };

    let repo = await CommonStaticRepository.findOneAndUpdate(
      PLAYLIST_COLLECTION,
      playlistCreateOptions,
    );

    const playlistOptions = {
      query: { _id: repo.data._id },
      populators: ["tracks"],
    };

    repo = await CommonStaticRepository.getOne(
      PLAYLIST_COLLECTION,
      playlistOptions,
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function deletePlaylist(req, res) {
  return await deleteById(req, res, PLAYLIST_COLLECTION);
}

async function addSongToPlaylist(req, res, next) {
  const {
    body: { songId },
    params: { id },
  } = req;

  try {
    const playlistUpdateOptions = {
      query: { _id: id },
      findByIdAndUpdateOptions: {
        $push: {
          tracks: [songId],
        },
      },
    };
    let playlist = await CommonStaticRepository.findOneAndUpdate(
      PLAYLIST_COLLECTION,
      playlistUpdateOptions,
    );

    const playlistOptions = {
      query: { _id: playlist.data._id },
      populators: ["tracks"],
    };
    playlist = await CommonStaticRepository.getOne(
      PLAYLIST_COLLECTION,
      playlistOptions,
    );

    return handleResponse(res, playlist, 200, 500);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getFavoritePlaylists,
  getOnePlaylist,
  addToFavorite,
  removeFromFavorite,
  removeTrack,
  deletePlaylist,
  editPlaylistInfo,
  addSongToPlaylist,
};
