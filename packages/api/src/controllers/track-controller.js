const { UserRepo, TrackRepo } = require("../repositories");
const {
  getAllById,
  addFavorite,
  removeFavorite,
  getFavorite,
  deleteById
} = require("./abstract-controller");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
const { getArtists, handleResponse } = require("../utils/utils");

async function createTrack(req, res, next) {
  // let {
  //   body: {
  //     title,
  //     url,
  //     thumbnail = null,
  //     duration = 0,
  //     genre = [],
  //     artistId = [],
  //     likedBy = []
  //   },
  //   user: { uid }
  // } = req;

  let {
    body: data,
    user: { uid }
  } = req;

  try {
    if (!title && !url) {
      
      return res.status(400).send({
        data: null,
        error: "Missing Fields (title, url)",
      });
    }

    const user = await UserRepo.findOne({ firebase_id: uid });
    const artists = await getArtists(JSON.parse(data.artistId));

    if (req.file) {
      const result = await uploadImageToCloudinary(req.file.path, null, "trackImages");

      if (result.error) {
        return res.status(503).send({
          data: null,
          error: "3rd Party Error: Failed to upload image"
        });
      }

      thumbnail = result.url;
      var cloudinaryThumbnailId = result.public_id;
    }

    data = {
      ...data,
      authorId: user.data._id,
      artistId: artists,
      cloudinaryThumbnailId,
      thumbnail
    };

    // const response = await TrackRepo.create({
    //   title,
    //   url,
    //   thumbnail,
    //   cloudinaryThumbnailId,
    //   duration,
    //   genre,
    //   authorId: user.data._id,
    //   artistId: artists,
    //   playlists,
    //   likedBy
    // });

    const response = await TrackRepo.create(data);

    return handleResponse(res, response, 201, 500);

  } catch (error) {
    next(error);
  }
}

async function editTrackInfo(req, res) {
  let {
    body: {
      title,
      thumbnail = null,
      genre = [],
      artistId = [],
      cloudinaryThumbnailId = null,
    },
    params: { id },
  } = req;

  try {
    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.path,
        cloudinaryThumbnailId,
        "trackImages",
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

    const artists = await getArtists(JSON.parse(artistId));
    const track = await TrackRepo.findOneAndUpdate(
      { _id: id },
      {
        title,
        genre,
        artistId: artists,
        thumbnail,
        cloudinaryThumbnailId
      },
    );

    return handleResponse(res, track, 200, 500);

  } catch (error) {
    throw new Error(error.message);
  }
}

async function getTracks(req, res) {
  return await getAllById(req, res, TrackRepo);
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
  deleteTrack
};
