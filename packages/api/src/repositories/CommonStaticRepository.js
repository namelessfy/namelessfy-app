const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

function populate(data, populators) {
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
    const { query = {}, populators = [] } = options;

    const data = db[collection].find(query);
    const populatedData = populate(data, populators);

    return normalizeDBQuery(populatedData);
  }

  static async getOne(collection, options) {
    const { query = {}, populators = [], projection } = options;

    const data = db[collection].findOne(query, projection);

    return normalizeDBQuery(populate(data, populators));
  }

  static async findOneAndUpdate(collection, options) {
    const {
      query = {},
      populators = [],
      findByIdAndUpdateOptions,
      projection,
    } = options;

    const findByIdAndUpdateData = db[collection].findByIdAndUpdate(
      query,
      findByIdAndUpdateOptions,
    );

    const response = await normalizeDBQuery(findByIdAndUpdateData);

    if (response.error) {
      return response;
    } else {
      const data = db[collection].findOne(query, projection);

      return normalizeDBQuery(populate(data, populators));
    }
  }

  static async findOneAndDelete(collection, options) {
    const { query = {} } = options;
    const data = db[collection].findByIdAndDelete(query);

    return normalizeDBQuery(data);
  }
}

module.exports = CommonStaticRepository;
