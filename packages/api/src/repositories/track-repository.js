const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  getAll(query) {
    return normalizeDBQuery(db.Track.find(query));
  }

  async findOneAndUpdate(query, data) {
    const response = await normalizeDBQuery(
      db.Track.findByIdAndUpdate(query, data),
    );

    if (response.error) {
      return response;
    } else {
      return normalizeDBQuery(db.Track.findOne(query));
    }
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db.Track.findByIdAndDelete(query));
  }
}

module.exports = new TrackRepository();
