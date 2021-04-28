const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class PlaylistRepository {
  create(options) {
    return normalizeDBQuery(db.Playlist.create(options));
  }

  getAll(query) {
    return normalizeDBQuery(db.Playlist.find(query));
  }

  async findOneAndUpdate(query, data) {
    const response = await normalizeDBQuery(
      db.Playlist.findByIdAndUpdate(query, data),
    );

    if (response.error) {
      return response;
    } else {
      return normalizeDBQuery(db.Playlist.findOne(query));
    }
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db.Playlist.findByIdAndDelete(query));
  }
}

module.exports = new PlaylistRepository();
