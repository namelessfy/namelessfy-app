const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class AbstractRepository {
  constructor(repo) {
    this.repo = repo;
  }

  create(options) {
    return normalizeDBQuery(db[this.repo].create(options));
  }

  getAll(query) {
    return normalizeDBQuery(db[this.repo].find(query));
  }

  async findOneAndUpdate(query, data) {
    const response = await normalizeDBQuery(
      db[this.repo].findByIdAndUpdate(query, data),
    );

    if (response.error) {
      return response;
    } else {
      return normalizeDBQuery(db[this.repo].findOne(query));
    }
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db[this.repo].findByIdAndDelete(query));
  }
}

module.exports = AbstractRepository;
