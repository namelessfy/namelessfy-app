const { UserRepo, TrackRepo } = require("../repositories");
const {
  getAllById,
  addFavorite,
  removeFavorite,
  getFavorite,
  deleteById,
} = require("./abstract-controller");
const { uploadImageToCloudinary } = require("../utils/cloudinary");

async function getArtists(array) {
  let artists = [];
  await Promise.all(
    array.map(async ({ userName }) => {
      try {
        let user = await UserRepo.findOne({ userName });
        if (user.error) {
          throw new Error(user.error);
        }
        artists.push({
          _id: user.data._id,
          userName,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  );
  return artists;
}

async function createTrack(req, res, next) {
  let {
    body: {
      title,
      url,
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

    const artists = await getArtists(JSON.parse(artistId));

    if (req.file) {
      const result = await uploadImageToCloudinary(
        req.file.path,
        null,
        "trackImages",
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

    const response = await TrackRepo.create({
      title,
      url,
      thumbnail,
      cloudinaryThumbnailId,
      duration,
      genre,
      authorId: user.data._id,
      artistId: artists,
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
        cloudinaryThumbnailId,
      },
    );

    if (track.error) {
      return res.status(500).send({
        data: null,
        error: track.error,
      });
    }

    if (track.data) {
      return res.status(200).send({
        data: track.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function getTracks(req, res) {
  console.log("==GET TRAKS===");

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
  deleteTrack,
};
