const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

function populate(data, options) {
  const { populators = {} } = options;

  populators.forEach((_) => {
    data.populate(_);
  });

  return data;
}

class CommonStaticRepository {
  static async create(collection, options) {
    const { query = {} } = options;
    const data = db[collection].create(query);

    return normalizeDBQuery(data);
  }

  static async getAll(collection, options) {
    const { query = {} } = options;
    const data = db[collection].find(query);

    return normalizeDBQuery(populate(data, options));
  }

  static async getOne(collection, options) {
    const { query = {}, projection } = options;
    const data = db[collection].findOne(query, projection);

    return normalizeDBQuery(populate(data, options));
  }

  static async findOneAndUpdate(collection, options) {
    const { query = {}, findByIdAndUpdateOptions, projection } = options;
    const findByIdAndUpdateData = db[collection].findByIdAndUpdate(
      query,
      findByIdAndUpdateOptions,
    );

    const response = await normalizeDBQuery(findByIdAndUpdateData);

    if (response.error) {
      return response;
    } else {
      const data = db[collection].findOne(query, projection);

      return normalizeDBQuery(populate(data, options));
    }
  }

  static async findOneAndDelete(collection, options) {
    const { query = {} } = options;
    const data = db[collection].findByIdAndDelete(query);

    return normalizeDBQuery(data);
  }
}

module.exports = CommonStaticRepository;
