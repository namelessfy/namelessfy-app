const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.User.findOne(query, "-__v"));
  }

  async findOneAndUpdate(query, data) {
    const response = await normalizeDBQuery(db.User.findOneAndUpdate(query, data));

    if (response.error) {
      return response;
    } else {
      return normalizeDBQuery(db.User.findOne(query, "-__v"));
    }
  }
}

module.exports = new UserRepository();
