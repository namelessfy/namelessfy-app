const { UserRepo, TrackRepo, PlaylistRepo } = require("../repositories");
const {
  getAllById,
  addFavorite,
  removeFavorite,
  getFavorite,
  deleteById,
} = require("./abstract-controller");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
const { getArtists, handleResponse } = require("../utils/utils");

function isValidRequest(res, title, url) {
  const errorMessage = "Missing Fields (title, url)";

  if (!title || !url) {
    return res.status(400).send({ data: null, error: errorMessage });
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
      "trackImages",
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

//async function genreExistAndCreate(res, genre, trackId) {
// TODO: add track to genre in case genre already exists.

// if (genre.length > 0) {
//   genre.forEach(async (name) => {
//     const genre = await GenreRepo.getAll({ name });

//     if (genre.error) {
//       return handleResponse(res, genre, null, 503);
//     }

//     if (genre.data.length <= 0) {
//       await GenreRepo.create({ name, track: [trackId] });
//     }

//     if (genre.data.length > 0) {
//     }
//   });
// }
//}

async function create(req, res, next) {
  try {
    const { uid } = req.user;
    let {
      title,
      url,
      duration = 0,
      genre = [],
      likedBy = [],
      playlists = [],
    } = req.body;
    let data = req.body;

    isValidRequest(res, title, url);

    const user = await UserRepo.findOne({ firebase_id: uid });
    const artists = await getArtists(JSON.parse(data.artistId));

    const cloudinaryUploadResponse = await handleCloudinaryUpdateImage(
      req,
      req.file,
    );

    const response = await TrackRepo.create({
      title,
      url,
      thumbnail: cloudinaryUploadResponse.thumbnail,
      cloudinaryThumbnailId: cloudinaryUploadResponse.cloudinaryThumbnailId,
      duration,
      genre,
      authorId: user.data._id,
      artistId: artists,
      playlists,
      likedBy,
    });

    return handleResponse(res, response, 201, 500);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  return await getAllById(req, res, TrackRepo, next);
}

async function getFavorites(req, res, next) {
  return await getFavorite(req, res, TrackRepo, next);
}

async function patchFull(req, res, next) {
  try {
    const { id } = req.params;
    let {
      title,
      thumbnail = null,
      genre = [],
      artistId = [],
      cloudinaryThumbnailId = null,
    } = req.body;

    //genreExistAndCreate(res, genre, id);

    const cloudinaryUploadResponse = await handleCloudinaryUpdateImage(
      res,
      req.file,
      cloudinaryThumbnailId,
    );

    const artists = await getArtists(JSON.parse(artistId));
    const track = await TrackRepo.findOneAndUpdate(
      { _id: id },
      {
        title,
        genre,
        artistId: artists,
        thumbnail: cloudinaryUploadResponse.thumbnail || thumbnail,
        cloudinaryThumbnailId:
          cloudinaryUploadResponse.cloudinaryThumbnailId ||
          cloudinaryThumbnailId,
      },
    );

    console.log(track);

    return handleResponse(res, track, 200, 500);
  } catch (error) {
    next(error);
  }
}
async function addToFavorite(req, res, next) {
  return await addFavorite(req, res, TrackRepo, next);
}

async function addToPlaylist(req, res, next) {
  try {
    const { title } = req.body;
    const { id } = req.params;

    const playlist = await PlaylistRepo.getAll({ title });

    if (playlist.error) {
      return handleResponse(res, playlist, null, 503);
    }

    const repo = await TrackRepo.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          playlists: {
            _id: playlist.data._id,
            date: new Date(),
          },
        },
      },
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function removeFromFavorite(req, res, next) {
  return await removeFavorite(req, res, TrackRepo, next);
}

async function removeFromPlaylist(req, res, next) {
  try {
    const { title } = req.body;
    const { id } = req.params;

    const playlist = await PlaylistRepo.getAll({ title });

    if (playlist.error) {
      return handleResponse(res, playlist, null, 503);
    }

    const repo = await TrackRepo.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          playlists: {
            _id: playlist.data._id,
          },
        },
      },
    );

    return handleResponse(res, repo, 200, 500);
  } catch (error) {
    next(error);
  }
}

async function deleteTrack(req, res) {
  return await deleteById(req, res, TrackRepo);
}

module.exports = {
  create,
  patchFull,
  getById,
  addToFavorite,
  addToPlaylist,
  removeFromFavorite,
  removeFromPlaylist,
  getFavorites,
  deleteTrack,
};
