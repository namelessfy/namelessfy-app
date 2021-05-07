const { UserRepo, PlaylistRepo } = require("../repositories");
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
    } = await handleCloudinaryUpdateImage(500, file);

    let playlist = await PlaylistRepo.create({
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
    });

    playlist = await PlaylistRepo.getOne({ _id: playlist.data._id }, [
      "tracks",
    ]);

    if (playlist.error) {
      return res.status(500).send({
        data: null,
        error: playlist.error,
      });
    }

    if (playlist.data) {
      return res.status(201).send({
        data: playlist.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getFavoritePlaylists(req, res, next) {
  try {
    const { uid } = req.user;
    let { id } = req.params;
    let firebase_id = id === "me" ? uid : id;

    const user = await UserRepo.findOne({ firebase_id });

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

    let query = id === "me" ? meQuery : defaultQuery;

    const playlists = await PlaylistRepo.getAll(query, ["tracks"]);

    if (playlists.error) {
      return handleResponse(res, playlists, null, 500);
    }

    return handleResponse(res, playlists, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function getOnePlaylist(req, res, next) {
  try {
    const { uid } = req.user;
    let { playlistId } = req.params;

    const user = await UserRepo.findOne({ firebase_id: uid });

    const query = {
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
    };

    const playlists = await PlaylistRepo.getOne(query);

    return handleResponse(res, playlists, 200, 503);
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

    const query = thumbnail
      ? {
          title,
          thumbnail,
          cloudinaryThumbnailId,
          publicAccessible,
        }
      : {
          title,
          publicAccessible,
        };
    const playlist = await PlaylistRepo.findOneAndUpdate({ _id: id }, query);

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

async function removeTrack(req, res, next) {
  try {
    const { _id } = req.body;
    const { id } = req.params;

    let repo = await PlaylistRepo.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          tracks: _id,
        },
      },
    );

    repo = await PlaylistRepo.getOne({ _id: repo.data._id }, ["tracks"]);

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function deletePlaylist(req, res) {
  return await deleteById(req, res, PlaylistRepo);
}

async function addSongToPlaylist(req, res, next) {
  const {
    body: { songId },
    params: { id },
  } = req;

  try {
    let playlist = await PlaylistRepo.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          tracks: [songId],
        },
      },
    );

    playlist = await PlaylistRepo.getOne({ _id: playlist.data._id }, [
      "tracks",
    ]);

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
