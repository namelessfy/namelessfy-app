const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.User.findOne(query, "-__v"));
  }

  /* find(query) {

  } */

  async findOneAndUpdate(query, data) {
    const response = await normalizeDBQuery(
      db.User.findOneAndUpdate(query, data),
    );

    if (response.error) {
      return response;
    } else {
      return normalizeDBQuery(db.User.findOne(query, "-__v"));
    }
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db.User.findOneAndDelete(query));
  }
}

module.exports = new UserRepository();
