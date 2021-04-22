const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  getAll(query) {
    return normalizeDBQuery(db.Track.find(query));
  }
}

module.exports = new TrackRepository();
