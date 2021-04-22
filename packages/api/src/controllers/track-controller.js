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

module.exports = {
  createTrack,
  getTracks,
};
