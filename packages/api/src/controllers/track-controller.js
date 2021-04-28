const { UserRepo, TrackRepo } = require("../repositories");

async function createTrack(req, res, next) {
  const {
    body: { title, url, thumbnail, genre, duration = 0 },
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
      title: title,
      url: url ? url : null,
      thumbnail: thumbnail ? thumbnail : null,
      duration: duration ? duration : 0,
      genre: genre ? genre : null,
      authorId: user.data._id,
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
  const {
    body: data,
    params: { id },
  } = req;

  try {
    const track = await TrackRepo.findOneAndUpdate({ _id: id }, data);

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
  const {
    user: { uid },
  } = req;

  try {
    const user = await UserRepo.findOne({
      firebase_id: uid,
    });

    if (user.error) {
      res.status(500).send({
        data: null,
        error: user.error,
      });
    }

    const tracks = await TrackRepo.getAll({ authorId: user.data._id });

    if (tracks.error) {
      return res.status(500).send({
        data: null,
        error: tracks.error,
      });
    }

    if (tracks.data) {
      return res.status(200).send({
        data: tracks.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function addFavoriteTrack(req, res) {
  const {
    user: { uid },
    params: { id },
  } = req;

  try {
    const user = await UserRepo.findOne({
      firebase_id: uid,
    });

    if (user.error) {
      res.status(500).send({
        data: null,
        error: user.error,
      });
    }

    const track = await TrackRepo.findOneAndUpdate(
      { _id: id },
      { $addToSet: { likedBy: user.data._id } },
    );

    if (track.error) {
      return res.status(500).send({
        data: null,
        error: track.error,
      });
    }

    if (track.data) {
      return res.status(201).send({
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

async function removeFavoriteTrack(req, res) {
  const {
    user: { uid },
    params: { id },
  } = req;

  try {
    const user = await UserRepo.findOne({
      firebase_id: uid,
    });

    if (user.error) {
      res.status(500).send({
        data: null,
        error: user.error,
      });
    }

    const track = await TrackRepo.findOneAndUpdate(
      { _id: id },
      { $pull: { likedBy: user.data._id } },
    );

    if (track.error) {
      return res.status(500).send({
        data: null,
        error: track.error,
      });
    }

    if (track.data) {
      return res.status(201).send({
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

async function getFavoriteTracks(req, res) {
  const { uid } = req.user;

  if (req.params.userId === "me") {
    const user = await UserRepo.findOne({
      firebase_id: uid,
    });
    console.log(user);
    req.params.userId = user.data._id;
  }

  try {
    const tracks = await TrackRepo.getAll({ likedBy: req.params.userId });

    if (tracks.error) {
      return res.status(500).send({
        data: null,
        error: tracks.error,
      });
    }

    if (tracks.data) {
      return res.status(200).send({
        data: tracks.data,
        error: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

async function deleteTrack(req, res) {
  try {
    const track = await TrackRepo.findOneAndDelete({ _id: req.params.id });

    if (track.error) {
      return res.status(400).send({
        data: null,
        error: track.error,
      });
    }

    if (track.data) {
      return res.status(200).send({
        data: track.data,
        message: "Successfully deleted the song!",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
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
