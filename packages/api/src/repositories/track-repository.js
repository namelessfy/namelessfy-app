const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  getAll(query) {
    return normalizeDBQuery(db.Track.find(query));
  }

  findOneAndUpdate(query, data) {
    const response = normalizeDBQuery(
      db.Track.findByIdAndUpdate(query, { $push: { likedBy: data } }),
    );

    if (response.error) {
      return response;
    } else {
      return normalizeDBQuery(db.Track.findOne(query));
    }
  }
}

module.exports = new TrackRepository();
